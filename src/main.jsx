import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CauroselDemo } from './CarouselDemo/cauroseldemo'
import { FakeStore } from './FakeStore/fakestore'
import { Categories } from './fakestore-consume/fakestorecategories'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Categories/>
  </StrictMode>,
)
