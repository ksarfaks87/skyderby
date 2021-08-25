import styled from 'styled-components'
import { devices } from 'styles/devices'

export const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  bottom: 41px;
  left: 0;
  right: 0;

  @media ${devices.small} {
    top: 60px;
    bottom: 41px;
  }
`

export const Header = styled.div`
  align-items: center;
  border-bottom: rgba(0, 0, 0, 0.14) 1px solid;
  color: #999;
  display: flex;
  flex-basis: 40px;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: 'Proxima Nova Semibold';
  font-size: 24px;
  padding: 0 5px;
`
