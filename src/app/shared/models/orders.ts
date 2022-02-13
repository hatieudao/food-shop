export interface Order{
  id: string;
  userId: string;
  createAt: Date;
  foods: any[];
  total?: number;
  status: string;
}
