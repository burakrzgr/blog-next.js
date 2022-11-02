import React, { Component, ReactNode } from 'react'
import { Badge, Stack } from 'react-bootstrap'
type CompMap = {
    [key: string]: ReactNode
  };
const interestTranslate: CompMap = {
    'science_fiction' : <Badge bg='danger'>Bilim Kurgu</Badge>,
    'fantasy' : <Badge bg='info'>Fantazi</Badge>,
    'horror' : <Badge bg='dark'>Korku</Badge>,
    'drama' : <Badge bg='warning'>Drama</Badge>,
  };

export const InterestDisplay = ({interests}:{interests:string}) => {
  return (
    <Stack direction='horizontal'>
        {interests.split(';').map((x,ix) => {return <div key={ix}>{interestTranslate[x]??<Badge>[{x}]</Badge>}</div>})}
    </Stack>
  )
}