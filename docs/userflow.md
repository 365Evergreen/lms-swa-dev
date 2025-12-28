## Landing screen

### Header

- 100% width
- Logo on left
- Megamenu parent items on the rught
    - Parent items are:
        1. Topics
        2. Courses
        3. Pathways
        4. Community
        5. Resources
    - Child items and their routes (and icons) are stored in this table: https://org05385a1b.crm6.dynamics.com/api/data/v9.2/hired_lmsmenuitems?$top=10
        1. Name column is the display name of the item
        2. Parent is one of the above
        3. Icon may be added
        4. Interaction is stored in the Route column
            - Interactions are, on select of menu item:
                - a pre-configured query is sent to Microsoft Graph to retrieve data
                - the app routes to a component or page that dynamically displays data from the call
- A search box is in the hero section
    1. Enterng a term and and pressing return or clicking the search icon performs a search and results are displayed on a new page
        - There are search filters
        - I can select from a list view or gallery view
        - I can sort my search by predefined criteria
        

### Course catalogue

