export interface Pagination {
    page: number;
    per_page : number;
  }
  
  export interface PaginationResponse <T> {
    data:{
        current_page: number;
        data?: T[];
        last_page:number
        per_page:number
        from:number
        to: number;
        total: number;
    }
    message: boolean;
    success: boolean;
  }

  export interface serverResponse <T> {
    data?:T
    message: boolean;
    success: boolean;
  }