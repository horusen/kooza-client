export interface ApiResponse<T = any> {
  data: T[];
  current_page?: number;
  first_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  total?: number;
}
