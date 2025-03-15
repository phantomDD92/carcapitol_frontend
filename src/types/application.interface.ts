export interface Application {
  id: string;
  vehicle: string;
  status:
    | 'Awaiting payment'
    | 'Confirmed'
    | 'In progress'
    | 'Paid'
    | 'Cancelled'
    | 'Completed';
  lender: string;
  submittedDate: string;
  approvalAmount: number;
}
