interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    type: string;
    created_at: Date;
  }
  
  export default Transaction;
  