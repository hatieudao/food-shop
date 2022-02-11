export interface Order{
  id: string;
  userId: string;
  createAt: string;
  foods: any[];
  total?: number;
  status: string;
}
