import { Autoplay, EffectFade, Grid, Mousewheel } from 'swiper/modules'

import { Swiper as SwiperClass } from 'swiper'

SwiperClass.use([Autoplay, Mousewheel, Mousewheel, Grid, EffectFade])

export default SwiperClass
export { Swiper, SwiperSlide } from 'swiper/vue'
