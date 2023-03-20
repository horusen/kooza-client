import { Product } from './../../product/product.model';
import { Customer } from './../../customer/customer.model';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { CreditLoan } from './../credit-loan.model';
import { BaseCreateComponent } from './../../shared/base-component/base-create.component';
import { Component, OnInit } from '@angular/core';
import { CreditLoanService } from '../credit-loan.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/product/product.service';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-credit-loan-create',
  templateUrl: './credit-loan-create.component.html',
  styleUrls: ['./credit-loan-create.component.scss'],
})
export class CreditLoanCreateComponent
  extends BaseCreateComponent<CreditLoan>
  implements OnInit
{
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    public creditLoanService: CreditLoanService,
    public authService: AuthService,
    public productService: ProductService,
    public customerService: CustomerService
  ) {
    super(creditLoanService);
  }

  ngOnInit(): void {
    this.initForm();

    if (this.authService.business.id) {
      this.getCustomers(this.authService.business.id);
      this.getProducts(this.authService.business.id);
    }

    this.subscriptions['customers'] = this.customerService.data$.subscribe(
      (data) => {
        this.customers = data;
      }
    );

    this.subscriptions['products'] = this.productService.data$.subscribe(
      (data) => {
        this.products = data;
      }
    );

    // this.form.controls['products'].valueChanges.subscribe(
    //   (value: Product[]) => {
    //     console.log(value);
    //     console.log(
    //       value
    //         .map((element) => +element.unit_price!)
    //         .reduce((prev, current) => prev + current, 0)
    //     );

    //     this.form.controls['amount'].patchValue(
    //       value
    //         .map((element) => +element.unit_price!)
    //         .reduce((prev, current) => prev + current, 0)
    //     );
    //   }
    // );
  }

  getProducts(business_id: string): void {
    this.loading = true;
    this.productService.getByBusinessId(business_id).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getCustomers(business_id: string): void {
    this.loading = true;
    this.customerService.getByBusinessId(business_id).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  get items() {
    return this.form.controls['items'] as FormArray<FormGroup>;
  }

  initForm() {
    this.form = this.fb.group({
      business_id: [this.authService.business.id, Validators.required],
      customer: [null, Validators.required],
      due_date: [null, Validators.required],
      amount: [{ value: null, disabled: true }, Validators.required],
      items: this.fb.array<FormGroup>([
        this.fb.group({
          product: [null, { validators: Validators.required }],
          quantity: [1, { validators: Validators.required }],
          total_price: [
            { value: 0, disabled: true },
            { validators: Validators.required },
          ],
        }),
      ]),
      description: [null],
    });

    this.items.controls[0].controls['product'].valueChanges.subscribe(
      (item) => {
        this.items.controls[0].controls['total_price'].patchValue(
          item[0].unit_price * this.items.controls[0].controls['quantity'].value
        );
      }
    );

    this.items.controls[0].controls['quantity'].valueChanges.subscribe(
      (item) => {
        this.items.controls[0].controls['total_price'].patchValue(
          this.items.controls[0].controls['product'].value[0].unit_price * item
        );
      }
    );

    this.items.valueChanges.subscribe((_) => {
      console.log(_);
      this.formValuePatcher(
        'amount',
        _.map((item) => item.quantity * item.product[0].unit_price).reduce(
          (prev, current) => prev + current,
          0
        )
      );
    });
  }

  addItem() {
    const itemForm = this.fb.group({
      product: [null, { validators: Validators.required }],
      quantity: [1, { validators: Validators.required }],
      total_price: [
        { value: 0, disabled: true },
        { validators: Validators.required },
      ],
    });

    itemForm.controls['product'].valueChanges.subscribe((item) => {
      console.log(item);
      itemForm.controls['total_price'].patchValue(
        // @ts-ignore
        item[0].unit_price * itemForm.controls['quantity'].value
      );
    });

    itemForm.controls['quantity'].valueChanges.subscribe((item) => {
      itemForm.controls['total_price'].patchValue(
        // @ts-ignore
        itemForm.controls['product'].value[0].unit_price * item
      );
    });

    this.items.push(itemForm);
  }

  override create() {
    if (!this.form.valid) {
      this.helper.notification.alertDanger('Invalid form');
      return;
    }

    this.loading = true;
    const data = {
      business_id: this.formValue('business_id'),
      due_date: this.formValue('due_date'),
      amount: this.items.value
        .map((item) => item.quantity * item.product[0].unit_price)
        .reduce((prev, current) => prev + current, 0),
      description: this.formValue('description'),
      customer_id: this.formValue('customer')[0].id,
      items: this.items.value.map((item) => {
        return { quantity: item.quantity, product_id: item.product[0].id };
      }),
    };

    this.service.store(data).subscribe(() => {
      this.loading = false;
      this.form.reset();
      this.helper.navigation.deleteFragmentFromUrl();
      this.helper.notification.alertSuccess();
    });
  }
}
