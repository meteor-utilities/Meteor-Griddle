# Meteor-Griddle

A smart Meteor wrapper for the [Griddle](http://griddlegriddle.github.io/Griddle/) React component

## Installation

- `meteor add utilities:meteor-griddle`
- `npm install --save griddle-react`

## Usage

### React Component

```
import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';
```

The `<MeteorGriddle/>` React component takes the same options as `<Griddle/>`, plus a couple extra ones:

#### Options

- `publication`: the publication that will provide the data
- `collection`: the collection to display
- `matchingResultsCount`: the name of the matching results counter
- `filteredFields`: an array of fields to search through when filtering
- `subsManager`: An optional [meteorhacks:subs-manager](https://atmospherejs.com/meteorhacks/subs-manager) instance
- `externalFilterDebounceWait`: When filtering data loaded from an external source, this time (in milliseconds) will be used to debounce the filter (to prevent results from refreshing on each keystroke). Default time is set to 300 ms. This property will only be used if the `useExternal` component property is set to `true`. For now the filter debounce option is limited to external data sources only.

#### Example

```jsx
  <MeteorGriddle
    publication="adminUsers"
    collection={Meteor.users}
    matchingResultsCount="matching-users"
    filteredFields={["email", "username", "emails.address", "services.meteor-developer.username"]}
    showFilter
  />
```

You'll usually want to pass along some of Griddle's [own options](http://griddlegriddle.github.io/Griddle/properties.html), too.

#### Loading Message Customization

If you're interested in displaying a custom table loading indicator/message, use the Griddle supported `externalLoadingComponent` property (which accepts a React Component):

```jsx
  <MeteorGriddle
    publication="adminUsers"
    collection={Meteor.users}
    ...
    externalLoadingComponent={UsersLoading}
  />
```
**Note:** Griddle uses the `externalIsLoading` (boolean) property to decide if the loading component should be shown or not. MeteorGriddle takes care of setting this property internally based on the subscription ready state. You do not need to pass this property in (and if you do it will be ignored).

#### Filtering

To show and use the Griddle filtering option, you must pass in either a `filteredFields` or `columns` property, as well as a `showFilter` property that's set to `true`.

```jsx
  <MeteorGriddle
    publication="gizmos.all"
    collection={gizmos}
    matchingResultsCount="gizmos-count"
    filteredFields={['name', 'description', 'color']}
    showFilter
  />
```          

#### External Options

To use any of Griddle's `external*` properties, you must pass in `useExternal` (set to `true`). `useExternal` is set to `false` by default. 

```jsx
  // Will ignore `externalResultsPerPage`
  <MeteorGriddle
    publication="gizmos.all"
    collection={gizmos}
    matchingResultsCount="gizmos-count"
    externalResultsPerPage={10}
  />
  
  // Will use `externalResultsPerPage`
  <MeteorGriddle
    publication="gizmos.all"
    collection={gizmos}
    matchingResultsCount="gizmos-count"
    externalResultsPerPage={10}
    useExternal
  />  
```  

### Publication

To use Griddle, you need to define a publication in your own codebase. That publication takes two `query` and `options` arguments from the client.

#### Example

```js
  Meteor.publish('adminUsers', function (query, options) {

    if(Users.isAdminById(this.userId)){

      var users = Meteor.users.find(query, options);

      // can't reuse "users" cursor
      Counts.publish(this, 'matching-users', Meteor.users.find(query, options));

      return users;
    }
  });
```

#### Notes

- The publication should publish a count of matching results using the [Publish Counts](https://github.com/percolatestudio/publish-counts) package.
- Note that [an issue with the Publish Counts package](https://github.com/percolatestudio/publish-counts/issues/58) prevents you from reusing the same cursor.
- You're trusted to make your own security checks on the `query` and `options` arguments.

#### SubsManager

The [meteorhacks:subs-manager](https://atmospherejs.com/meteorhacks/subs-manager) package can be used with `MeteorGriddle` to help cache subscriptions. Simply create a new SubsManager instance then pass it in via the `subsManager` property. For example:

```jsx
const subsManager = new SubsManager();
const ProductList = () => (
  <div className="products">
    <MeteorGriddle
      publication="products.all"
      collection={products}
      subsManager={subsManager}
    />
  </div>
);
```

## History

### 1.2.0

- Clarified docs mentioning must have filtered fields or columns defined to use filter.
- Adjusted so `useExternal` must be set to use `external*` properties. Set to `false` by default.
- Added `externalFilterDebounceWait` property for controlling external data source filter debouncing.
