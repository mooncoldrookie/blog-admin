import 'ant-design-vue/es/pagination/style/css'
import 'ant-design-vue/es/select/style/css'
import 'ant-design-vue/es/tooltip/style/css'
import 'ant-design-vue/es/modal/style/css'
import 'ant-design-vue/es/slider/style/css'
import 'ant-design-vue/es/message/style/css'

// antd vue 按需加载
import Pagination from 'ant-design-vue/lib/pagination'
import Select from 'ant-design-vue/lib/select'
import Tooltip from 'ant-design-vue/lib/tooltip'
import Modal from 'ant-design-vue/lib/modal'
import Slider from 'ant-design-vue/lib/slider'

export function useComponents(app) {
  app.use(Pagination).use(Select).use(Tooltip).use(Modal).use(Slider)
}
