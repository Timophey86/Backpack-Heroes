import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import {userService} from './user.service'

export const orderService = {
  save,
  query,
  remove
}



function query(filterBy) {
  if (!filterBy.filter) {
    return httpService.get(`orders`);
  }
  return httpService.get(`orders/?userId=${filterBy.filter.userId}&type=${filterBy.filter.isForUserApproval}`)

}

function remove(orderId) {
  return httpService.delete(`orders/${orderId}`)


}

function save(order) {
  if (order._id) {
    return httpService.put(`orders/${order._id}`, order);
  } else {
    return httpService.post(`orders`, order);
  }
}