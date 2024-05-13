import React from 'react'
import { MarkdownField, MarkdownFieldProps } from './MarkdownField'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Forms/MarkdownField',
  component: MarkdownField
} as Meta

export const MapStory: StoryFn<MarkdownFieldProps> = (
  args: MarkdownFieldProps
) => {
  return <MarkdownField {...args} />
}

MapStory.args = {
  markdown: `La volonté politique est un élément crucial pour la préservation de l'écosystème du bois local. Elle détermine l'engagement des autorités gouvernementales et des décideurs politiques en faveur de la conservation forestière, ainsi que la mise en place de politiques et de mesures incitatives pour promouvoir une gestion durable des ressources forestières.

  **Nous avons évalué la volonté politique en examinant plusieurs aspects, notamment :**
  
  L'adoption de politiques et de cadres juridiques : Nous avons analysé la présence de politiques nationales et de cadres législatifs spécifiques visant à promouvoir la conservation forestière, 
  à réguler l'exploitation forestière et à garantir la protection des habitats naturels. L'allocation de ressources : Nous avons examiné si des budgets adéquats ont été alloués à la conservation forestière, 
  y compris pour le financement de programmes de reboisement, de surveillance forestière et de gestion des aires protégées. La sensibilisation et l'éducation : 
  
  Nous avons évalué les efforts déployés pour sensibiliser le public et les acteurs concernés à l'importance de la conservation forestière, ainsi que pour promouvoir une culture de responsabilité environnementale et de durabilité. La collaboration internationale : 
  Nous avons pris en compte la participation aux initiatives internationales de conservation forestière, ainsi que l'engagement dans des accords et des conventions visant à protéger les forêts et la biodiversité à l'échelle mondiale.
  
  * Score 1 : Absence de politiques forestières claires, ressources limitées allouées à la conservation, faible sensibilisation du public et absence d'engagement international.
  * Score 2 : Politiques forestières existantes mais non pleinement appliquées, ressources insuffisantes, sensibilisation limitée, participation sporadique à des initiatives internationales.
  * Score 3 : Politiques forestières bien établies mais nécessitant des améliorations, allocation de ressources acceptable mais insuffisante, efforts de sensibilisation modérés, engagement international limité.
  * Score 4 : Politiques forestières efficaces et appliquées, ressources suffisantes allouées à la conservation, sensibilisation active, participation régulière à des initiatives internationales.
  * Score 5 : Politiques forestières exemplaires, ressources abondantes, sensibilisation généralisée, engagement international fort et leadership dans les initiatives de conservation forestière à l'échelle mondiale.`
}

MapStory.storyName = 'MarkdownField'
