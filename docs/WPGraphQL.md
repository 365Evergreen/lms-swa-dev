## WPGraphQL endpoint

https://thn.chh.mybluehost.me/website_8a441532/graphql 

## Global navigation

query gblNav  
{
  menus {
    nodes {
      id
      databaseId
      name
      menuItems {
        edges {
          node {
            id
            label
             url
            parentId
          }
        }
      }
    }
  }
}

## Courses