import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CauroselDemo } from './CarouselDemo/cauroseldemo'
import { FakeStore } from './FakeStore/fakestore'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <FakeStore/>
  </StrictMode>,
)
