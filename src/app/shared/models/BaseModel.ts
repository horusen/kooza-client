// import { User } from 'src/app/express-courrier/users/user.model';

export interface BaseModel {
  id?: number;
  inscription?: number;
  created_at?: Date;
  update_at?: Date;
  deleted_at?: Date;
}
