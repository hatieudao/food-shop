import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminOrderService } from 'app/admin/services/admin-order.service';
import Chart from 'chart.js/auto';
import { map } from 'rxjs';
import { Order } from 'shared/models/orders';
import { FoodService } from 'shared/services/food.service';
@Component({
  selector: 'app-admin-statistic',
  templateUrl: './admin-statistic.component.html',
  styleUrls: ['./admin-statistic.component.scss']
})
export class AdminStatisticComponent implements OnInit {
  orders: any[] = [];
  filteredOrder: any[] = [];
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  chart:any = undefined;
  totalInTime:number = 0;
  constructor(
    private orderService: AdminOrderService,
  ) { 
    this.orderService.getAllOrders()
    .subscribe(data => {
      this.orders = data;
      this.filteredOrder = data;
      this.draw();
    })
  }
  draw(){
    const data = this.getDataChart();
    this.totalInTime = data.reduce((sum, item) => sum += item.total, 0);
    if(this.chart){
      this.chart.destroy();
    }
    this.chart= new Chart("myChart", {
    type: 'line',
    data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: data.map(d => d.date.toDate()),
        datasets: [{
            label: '# of Votes',
            // data: [12, 19, 3, 5, 2, 3],
            data: data.map(d => d.total),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });
  }
  ngOnInit(): void {
    console.log('DONE')
  }
  getTotal(foods:any){
    console.log(foods);
    return foods.reduce((total:any, food:any) => total += food.price * food.quantity, 0)
  }
  getDataChart(){
    return this.filteredOrder.map(
      order => ({date: order.createAt, total: order.total})
      )
      .sort((x,y)=> x.date-y.date);
  }
  filterData(){
    this.filteredOrder =  this.orders.filter(order=> {
      const create = new Date(order.createAt.toMillis());
      const start = new Date(this.range.get('start')?.value.toJSON());
      const end = new Date(this.range.get('end')?.value.toJSON());
      return create >= start && create <= end 
    })
    console.log(this.filteredOrder);
    this.draw();
  }
   
}
