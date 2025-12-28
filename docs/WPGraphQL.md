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

query courses {
  courses {
    nodes {
      id
      title
    }
    edges {
      node {
        contentTypeName
        course {
          title(format: RENDERED)
        }
      }
    }
  }
}

## Topics

query topics {
  topics {
    nodes {
      id
      title
    }
    edges {
      node {
        contentTypeName
        course {
          title(format: RENDERED)
        }
      }
    }
  }
}

## Pathways

query topics {
  pathways {
    nodes {
      id
      title
    }
    edges {
      node {
        contentTypeName
        course {
          title(format: RENDERED)
        }
      }
    }
  }
}

## Community

No query. Add routing to community (component or page)

## Resources

query eBooks {
  eBooks {
    nodes {
      id
      title
    }
    edges {
      node {
        contentTypeName
        course {
          title(format: RENDERED)
        }
      }
    }
  }
}