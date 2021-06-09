import Vue from 'vue'
import { Button } from 'element-ui'
import {Form, FormItem } from 'element-ui'
import {Input} from 'element-ui'
//导入弹框提示组件
import { Message } from 'element-ui'
import { Container,Header,Aside,Main } from 'element-ui'
import { Menu,Submenu,MenuItemGroup,MenuItem } from 'element-ui'
import {Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Pagination } from 'element-ui'
import { Dialog } from 'element-ui'
import { MessageBox } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.use(Dialog)

