import type { NextPage } from 'next'
import { styled } from '@linaria/react'
import { anyDesktop, docTitleFontFamily, flexColumn, flexRow, phone, phoneAndTablet, tablet, tintFontStack } from '../shared/styles/theme'
import { Book, BookOpen } from 'react-feather'

const DocHomeContainer = styled.div`
  ${flexColumn('center')}
  justify-content: center;
  width: 100%;
`

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: 600;
  font-family: ${tintFontStack};
  margin-top: 40px;
  margin-bottom: 8px;
  color: black;
  ${phoneAndTablet} {
    font-size: 2rem;
  }
`

const Subtitle = styled.div`
  font-weight: 400;
  font-size: 19px;
  ${phone} {
    font-size: 18px;
  }
  margin-top: 28px;
  color: #626a73;
  ${anyDesktop} {
    padding: 0 80px;
  }
  ${tablet} {
    padding: 0 40px;
  }
  line-height: 1.5;
`

const GetStartedButton = styled.a`
  display: block;
  text-decoration: none;
  background-color: rgb(72, 187, 120);
  transition: all 0.2s ease-in-out 0s;
  color: rgb(255, 255, 255);
  padding: 10px 32px 10px 24px;
  border-radius: 4px;
  margin-top: 28px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  :hover {
    background-color: rgb(43, 143, 85);
  }
`

const OverviewContainer = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 7%) 0px 28px 53px, rgb(0 0 0 / 4%) 0px 8.44118px 15.9779px, rgb(0 0 0 / 2%) 0px 3.50603px 6.63642px, rgb(0 0 0 / 1%) 0px 1.26806px 2.40026px;
  border-radius: 8px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  row-gap: 2rem;
  padding: 32px 48px;
  margin-top: 60px;
  flex-direction: row;
  ${phone} {
    flex-direction: column;
    gap: 60px;
  }
  gap: 20px;
`

const OverviewSection = styled.div`
  ${flexColumn('flex-start')}
  flex: 1 1 0;
`

type OverviewSectionIconContainerProps = {
  color: string
  content: string
}

const OverviewSectionIconContainer = styled.div<OverviewSectionIconContainerProps>`
  background-color: ${props => props.color};
  border-radius: 8px;
  height: 64px;
  width: 64px;
  ${flexColumn('center')}
  justify-content: center;
  color: ${props => props.content};
`

const OverviewSectionTitle = styled.div`
  font-weight: bold;
  letter-spacing: 0.02em;
  font-size: 14px;
  text-transform: uppercase;
  margin-top: 20px;
`

const OverviewSectionItems = styled.div`
  ${flexColumn('flex-start')}
  margin-top: 20px;
`

const OverviewSectionItem = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
  color: rgb(45, 55, 72);
  margin-top: 4px;
  position: relative;
  padding-left: 16px;
  :hover {
    color: #0052ff;
  }
  ::before {
    content: " ";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: rgb(160,174,192);
    position: absolute;
    left: 0;
    top: 9px;
  }
`

const LargeTitle = styled.div`
  font-family: ${docTitleFontFamily};
  font-size: 36px;
  font-weight: 700;
  margin-top: 60px;
`

const GuideItems = styled.div`
  ${flexRow('stretch')}
  justify-content: flex-start;
  width: 100%;
  gap: 40px;
  margin-top: 40px;
  ${phone} {
    ${flexColumn('stretch')}
    gap: 32px;
  }
`

const GuideItem = styled.a`
  text-decoration: none;
  display: block;
  border-radius: 4px;
  overflow: hidden;
  flex: 1 1 0;
  background-color: rgb(250,250,254);
  transition: all 0.2s ease-in-out 0s;
  :hover {
    background-color: rgb(244, 244, 249);
  }
`

type GuideItemHeadingProps = {
  color: string
}

const GuideItemHeading = styled.div<GuideItemHeadingProps>`
  background-color: ${props => props.color};
  height: 4px;
`

const GuideItemTitle = styled.div`
  margin: 24px 20px 20px 20px;
  font-weight: bold;
  line-height: 1rem;
  font-size: 1rem;
  color: rgb(26, 32, 44) !important;
`

const GuideItemText = styled.div`
  margin: -10px 20px 28px 20px;
  font-weight: 300;

`

const DocHome: NextPage = () => {
  return <DocHomeContainer>
    <Title>TEO Documentation</Title>
    <Subtitle>Welcome to Teo documentation center! Choose a topic to get started with. Join our thriving community on Slack and GitHub for help and ideas.</Subtitle>
    <GetStartedButton href="/getting-started"><Book />Getting started</GetStartedButton>
    <OverviewContainer>
      <OverviewSection>
        <OverviewSectionIconContainer color="rgb(255, 235, 248)" content='rgb(248, 62, 183)'>
          <BookOpen />
        </OverviewSectionIconContainer>
        <OverviewSectionTitle>OVERVIEW</OverviewSectionTitle>
        <OverviewSectionItems>
          <OverviewSectionItem href="/concepts/overview/what-is-teo">What is Teo?</OverviewSectionItem>
          <OverviewSectionItem href="/concepts/overview/why-teo">Why Teo?</OverviewSectionItem>
        </OverviewSectionItems>
      </OverviewSection>
      <OverviewSection>
        <OverviewSectionIconContainer color="rgb(235, 255, 244)" content='rgb(16, 227, 86)'>
          <BookOpen />
        </OverviewSectionIconContainer>
        <OverviewSectionTitle>SCHEMA</OverviewSectionTitle>
        <OverviewSectionItems>
          <OverviewSectionItem href="/concepts/components/teo-schema/connector">Connector</OverviewSectionItem>
          <OverviewSectionItem href="/concepts/components/teo-schema/model">Model</OverviewSectionItem>
          <OverviewSectionItem href="/concepts/components/teo-schema/field">Field</OverviewSectionItem>
          <OverviewSectionItem href="/concepts/components/teo-schema/relation">Relation</OverviewSectionItem>
          <OverviewSectionItem href="/concepts/components/teo-schema/property">Property</OverviewSectionItem>
          <OverviewSectionItem href="/concepts/components/teo-schema/action">Action</OverviewSectionItem>
        </OverviewSectionItems>
      </OverviewSection>
      <OverviewSection>
        <OverviewSectionIconContainer color="rgb(255, 241, 235)" content='rgb(240, 138, 30)'>
          <BookOpen />
        </OverviewSectionIconContainer>
        <OverviewSectionTitle>QUERY CLIENT</OverviewSectionTitle>
        <OverviewSectionItems>
          <OverviewSectionItem href="/guides/query-client-guides/crud">CRUD</OverviewSectionItem>
          <OverviewSectionItem href="/guides/query-client-guides/filtering-and-sorting">Filtering and sorting</OverviewSectionItem>
          <OverviewSectionItem href="/guides/query-client-guides/pagination">Pagination</OverviewSectionItem>
          <OverviewSectionItem href="/guides/query-client-guides/relation-queries">Relation queries</OverviewSectionItem>
          <OverviewSectionItem href="/guides/query-client-guides/aggregation-grouping-summarizing">Aggregation, grouping and summarizing</OverviewSectionItem>
        </OverviewSectionItems>
      </OverviewSection>
    </OverviewContainer>
    <LargeTitle>Guides</LargeTitle>
    <Subtitle>Get things done with Teo.</Subtitle>
    <GuideItems>
      <GuideItem href='/guides/server-guides/data-modeling'>
        <GuideItemHeading color='#fda335' />
        <GuideItemTitle>Data modeling</GuideItemTitle>
        <GuideItemText>Teo provides a lot of builtin descriptive decorators and pipeline items. Model your data with Teo.</GuideItemText>
      </GuideItem>
      <GuideItem href='/guides/server-guides/route-handlers'>
        <GuideItemHeading color='#f86be3' />
        <GuideItemTitle>Route handlers</GuideItemTitle>
        <GuideItemText>Define custom route handlers with Teo just like any other web frameworks.</GuideItemText>
      </GuideItem>
      <GuideItem href='/guides/server-guides/middlewares'>
        <GuideItemHeading color='#4eb5ff' />
        <GuideItemTitle>Middlewares</GuideItemTitle>
        <GuideItemText>Use custom middlewares to perform common actions and abstract things out.</GuideItemText>
      </GuideItem>
    </GuideItems>
    <LargeTitle>Reference</LargeTitle>
    <Subtitle>API reference and database reference.</Subtitle>
    <GuideItems>
      <GuideItem href='/reference/api-reference'>
        <GuideItemHeading color='#33d41a' />
        <GuideItemTitle>API reference</GuideItemTitle>
        <GuideItemText>Reference for Teo schema, Teo server side library and generated query clients.</GuideItemText>
      </GuideItem>
      <GuideItem href='/reference/cli-reference'>
        <GuideItemHeading color='#c467fe' />
        <GuideItemTitle>CLI reference</GuideItemTitle>
        <GuideItemText>Reference for Teo CLI tool.</GuideItemText>
      </GuideItem>
    </GuideItems>
  </DocHomeContainer>
}

export default DocHome
