import React, { ReactElement, ReactNode } from 'react'
import Link from 'next/link'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { docFontFamily, docTagBackgroundColor, docTagColor, docTextColor, docTextSelectedColor, docTextUnselectedColor, flexColumn, flexRow, margin, phone, spacing } from '../styles/theme'

const DocSidebarContainer = styled.div`
  ${flexColumn('flex-start')};
  width: 232px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  ${phone} {
    display: none;
  }
`

const DocSidebarTitle = styled.div`
  font-family: ${docFontFamily};
  color: ${docTextColor};
  font-size: 18px;
  font-weight: 600;
  margin: ${spacing * 3}px 0 ${spacing * 1.5}px 0;
`

const DocSidebarSectionTitle = styled.div`
  font-size: 12px;
  color: ${docTextColor};
  text-transform: uppercase;
  margin-top: ${spacing}px;
  margin-bottom: ${spacing}px;
  font-weight: 600;
`

const DocSidebarItemTitleContainer = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${docTextUnselectedColor};
  ${flexColumn('flex-start')}
  justify-content: space-between;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: ${spacing}px;
  }
`

const docSidebarItemTitleLinkClassName = css`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
`

const DocSidebarItemTitleLine = styled.div`
  position: relative;
  width: 100%;
  ${flexRow('center')}
  justify-content: space-between;
  cursor: pointer;
`

const DocSidebarItemTitleTime = styled.div`
  color: ${docTagColor};
  background-color: ${docTagBackgroundColor};
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 5px;
  border-radius: 5px;
`

const DocSidebarItemInner = styled.div`
  padding-left: ${spacing * 2.85}px;
  margin-left: -${spacing * 1.5}px;
  border-left: 2px solid rgb(226, 232, 240);
  margin-bottom: ${spacing * 1.5}px;
`

const DocSidebarItemIndicatorButton = styled.button`
  background: transparent;
  position: absolute;
  left: -15px;
  top: 4px;
  padding: 0px;
  border: 0px;
`

type DocSidebarItemIndicatorProps = {
  open: boolean
}

const DocSidebarItemIndicator: (props: DocSidebarItemIndicatorProps) => ReactElement = ({ open }) => {
  return <DocSidebarItemIndicatorButton>
    {!open ? <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.724246C0 0.111374 0.681914 -0.223425 1.13107 0.168926L4.66916 3.25957C5.11028 3.6449 5.11028 4.3551 4.66916 4.74043L1.13107 7.83107C0.681913 8.22342 0 7.88863 0 7.27575V0.724246Z" fill="#A0AEC0"></path></svg> : <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="down open"><path d="M7.27575 0.5C7.88863 0.5 8.22342 1.18191 7.83107 1.63107L4.74043 5.16916C4.3551 5.61028 3.6449 5.61028 3.25957 5.16916L0.168926 1.63107C-0.223425 1.18191 0.111375 0.5 0.724247 0.5L7.27575 0.5Z" fill="#A0AEC0"></path></svg>}
  </DocSidebarItemIndicatorButton>
}

type DocSidebarItemProps = {
  children?: ReactNode,
  time?: string,
  link: string,
  title: string,
  path?: string,
}

const DocSidebarItem: (props: DocSidebarItemProps) => ReactElement = ({ link, children, time, title, path }) => {
  let open: boolean;
  if (children && path) {
    open = path.startsWith(link)
  } else {
    open = false
  }
  let selected: boolean;
  if (path) {
    selected = path === link
  } else {
    selected = false
  }
  return <>
    <DocSidebarItemTitleContainer>
      <Link href={link} className={docSidebarItemTitleLinkClassName}>
        <DocSidebarItemTitleLine className={selected ? css`
          color: ${docTextSelectedColor};
          font-weight: 600;
        ` : css`
          font-weight: 300;
        `}>
          {children ? <DocSidebarItemIndicator open={open} /> : null}
          <div>{title}</div>
          {time ? <DocSidebarItemTitleTime>{time}</DocSidebarItemTitleTime> : null}
        </DocSidebarItemTitleLine>
      </Link>
    </DocSidebarItemTitleContainer>
    {open ?
      <DocSidebarItemInner>
        {children}
      </DocSidebarItemInner>
    : null}
  </>
}

type DocumentationSidebarProps = {
  path: string
}

const DocGetStartedSidebar: (props: DocumentationSidebarProps) => ReactElement = ({ path }) => {
  return <DocSidebarContainer>
    <DocSidebarTitle>Getting started</DocSidebarTitle>
    <DocSidebarItem path={path} link='/getting-started/quickstart' title='Quickstart' time='5 min'></DocSidebarItem>
    <DocSidebarSectionTitle>Beginner tutorial</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/getting-started/beginner-tutorial/write-a-schema-only-app' title='Write a schema only app' />
    <DocSidebarItem path={path} link='/getting-started/beginner-tutorial/write-route-handlers' title='Write route handlers' />
    {/* <DocSidebarSectionTitle>Set Up Teo</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/getting-started/set-up-teo/start-from-scratch' title='Start from scratch'>
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/start-from-scratch/create-a-project' title='Create a project' />
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/start-from-scratch/connect-your-database' title='Connect your database' />
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/start-from-scratch/declare-your-schema' title='Declare your schema' />
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/start-from-scratch/request-with-query-client' title='Request with query client' />
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/start-from-scratch/use-model-entities' title='Use model entities' />
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/start-from-scratch/next-steps' title='Next steps' />
    </DocSidebarItem>
    <DocSidebarItem path={path} link='/getting-started/set-up-teo/migrate-from-existing-project' title='Migrate from existing project'>
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/migrate-from-existing-project/migrate-from-vanilla-framework' title='Migrate from vanilla framework' />
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/migrate-from-existing-project/migrate-from-prisma' title='Migrate from Prisma' />
      <DocSidebarItem path={path} link='/getting-started/set-up-teo/migrate-from-existing-project/migrate-from-graphql' title='Migrate from GraphQL' />
    </DocSidebarItem> */}
  </DocSidebarContainer>
}

const DocConceptsSidebar: (props: DocumentationSidebarProps) => ReactElement = ({ path }) => {
  return <DocSidebarContainer>
    <DocSidebarTitle>Concepts</DocSidebarTitle>
    <DocSidebarSectionTitle>Overview</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/concepts/overview/what-is-teo' title='What is Teo?'></DocSidebarItem>
    <DocSidebarItem path={path} link='/concepts/overview/why-teo' title='Why Teo?'></DocSidebarItem>
    <DocSidebarSectionTitle>Components</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/concepts/components/teo-schema' title='Teo Schema'>
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/connector' title='Connector' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/model' title='Model' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/field' title='Field' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/relation' title='Relation' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/property' title='Property' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/index-concept' title='Index' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/action' title='Action' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/pipeline' title='Pipeline' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/identity' title='Identity' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/guard' title='Guard' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/generator' title='Generator' />
      <DocSidebarItem path={path} link='/concepts/components/teo-schema/server' title='Server' />
    </DocSidebarItem>
    <DocSidebarItem path={path} link='/concepts/components/teo-cli' title='Teo CLI'></DocSidebarItem>
  </DocSidebarContainer>
}

const DocGuidesSidebar: (props: DocumentationSidebarProps) => ReactElement = ({ path }) => {
  return <DocSidebarContainer>
    <DocSidebarTitle>Guides</DocSidebarTitle>
    <DocSidebarSectionTitle>Server guides</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/guides/server-guides/data-modeling' title='Data modeling' />
    <DocSidebarItem path={path} link='/guides/server-guides/route-handlers' title='Route handlers' />
    <DocSidebarItem path={path} link='/guides/server-guides/middlewares' title='Middlewares' />
    <DocSidebarItem path={path} link='/guides/server-guides/namespaces' title='Namespaces' />
    <DocSidebarSectionTitle>Query client guides</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/guides/query-client-guides/crud' title='CRUD' />
    <DocSidebarItem path={path} link='/guides/query-client-guides/filtering-and-sorting' title='Filtering and sorting' />
    <DocSidebarItem path={path} link='/guides/query-client-guides/pagination' title='Pagination' />
    <DocSidebarItem path={path} link='/guides/query-client-guides/selecting-fields' title='Selecting fields' />
    <DocSidebarItem path={path} link='/guides/query-client-guides/relation-queries' title='Relation queries' />
    <DocSidebarItem path={path} link='/guides/query-client-guides/aggregation-grouping-summarizing' title='Aggregation, grouping and summarizing' />
  </DocSidebarContainer>
}

const DocAPIReferenceSidebar: (props: DocumentationSidebarProps) => ReactElement = ({ path }) => {
  return <DocSidebarContainer>
    <DocSidebarTitle>Reference</DocSidebarTitle>
    <DocSidebarSectionTitle>API Reference</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/reference/api-reference/schema-reference' title='Schema reference' />
    <DocSidebarItem path={path} link='/reference/api-reference/server-api-reference' title='Server API reference'>
      <DocSidebarItem path={path} link='/reference/api-reference/server-api-reference/rust-api-reference' title='Rust API reference'></DocSidebarItem>
      <DocSidebarItem path={path} link='/reference/api-reference/server-api-reference/nodejs-api-reference' title='Node.js API reference'></DocSidebarItem>
      <DocSidebarItem path={path} link='/reference/api-reference/server-api-reference/python-api-reference' title='Python API reference'></DocSidebarItem>
    </DocSidebarItem>
    <DocSidebarItem path={path} link='/reference/api-reference/client-api-reference' title='Teo client API reference'>
      <DocSidebarItem path={path} link='/reference/api-reference/client-api-reference/typescript-api-reference' title='TypeScript API reference'></DocSidebarItem>
      <DocSidebarItem path={path} link='/reference/api-reference/client-api-reference/swift-api-reference' title='Swift API reference'></DocSidebarItem>
      <DocSidebarItem path={path} link='/reference/api-reference/client-api-reference/kotlin-api-reference' title='Kotlin API reference'></DocSidebarItem>
      <DocSidebarItem path={path} link='/reference/api-reference/client-api-reference/dart-api-reference' title='Dart API reference'></DocSidebarItem>
      <DocSidebarItem path={path} link='/reference/api-reference/client-api-reference/csharp-api-reference' title='C# API reference'></DocSidebarItem>
    </DocSidebarItem>
    <DocSidebarSectionTitle>CLI Reference</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/reference/cli-reference' title="CLI reference"></DocSidebarItem>
    {/* <DocSidebarSectionTitle>Database Reference</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/reference/database-reference/database-features-matrix' title='Database features matrix'></DocSidebarItem>
    <DocSidebarItem path={path} link='/reference/database-reference/connection-urls' title='Connection URLs'></DocSidebarItem>
    <DocSidebarItem path={path} link='/reference/database-reference/supported-databases' title='Supported databases'></DocSidebarItem> */}
  </DocSidebarContainer>
}

const DocCookbookSidebar: (props: DocumentationSidebarProps) => ReactElement = ({ path }) => {
  return <DocSidebarContainer>
    <DocSidebarTitle>Cookbook</DocSidebarTitle>
    <DocSidebarSectionTitle>Code snippets</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/cookbook/code-snippets/user-session' title='User session'>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/user-session/define-email-field' title='Define email field'></DocSidebarItem>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/user-session/define-phone-number-field' title='Define phone number field'></DocSidebarItem>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/user-session/sign-in-with-password' title='Sign in with password'></DocSidebarItem>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/user-session/sign-in-with-auth-code' title='Sign in with auth code'></DocSidebarItem>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/user-session/update-password-with-the-old-one' title='Update password with the old one'></DocSidebarItem>
    </DocSidebarItem>
    <DocSidebarItem path={path} link='/cookbook/code-snippets/ecommerce' title='Ecommerce'>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/ecommerce/product-catalog' title='Product catalog'></DocSidebarItem>
    </DocSidebarItem>
    <DocSidebarItem path={path} link='/cookbook/code-snippets/voting' title='Voting'>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/voting/each-user-vote-once' title='Each user vote once'></DocSidebarItem>
      <DocSidebarItem path={path} link='/cookbook/code-snippets/voting/unlimited-voting' title='Unlimited voting'></DocSidebarItem>
    </DocSidebarItem>
    <DocSidebarSectionTitle>Sample code</DocSidebarSectionTitle>
    <DocSidebarItem path={path} link='/cookbook/sample-code/user-management' title='User management' />
    <DocSidebarItem path={path} link='/cookbook/sample-code/ecommerce-platform' title='Ecommerce platform' />
    <DocSidebarItem path={path} link='/cookbook/sample-code/voting-system' title='Voting system' />
  </DocSidebarContainer>
}

export const DocumentationSidebar = (props: DocumentationSidebarProps) => {
  if (props.path.startsWith('/getting-started')) {
    return <DocGetStartedSidebar path={props.path} />
  } else if (props.path.startsWith('/concepts')) {
    return <DocConceptsSidebar path={props.path} />
  } else if (props.path.startsWith('/guides')) {
    return <DocGuidesSidebar path={props.path} />
  } else if (props.path.startsWith('/reference')) {
    return <DocAPIReferenceSidebar path={props.path} />
  } else if (props.path.startsWith('/cookbook')) {
    return <DocCookbookSidebar path={props.path} />
  } else {
    return <></>
  }
}
