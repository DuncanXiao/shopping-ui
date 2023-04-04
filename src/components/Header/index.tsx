import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

const Header = ({ children, title = 'This is the default title' }: Props) => (
  <header>
    <div></div>
  </header>
)

// {
//   "age": 18,
//   "code": "3424324,23432,789787,12345",
//   "dete": "2022-09-23 00:00:00",
//   "name": "林某某",
//   "org": "财务部",
//   "sex": 0,
//   "start": 1
// }

export default Header