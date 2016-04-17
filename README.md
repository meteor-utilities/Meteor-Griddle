# Meteor-Griddle

A smart Meteor wrapper for the [Griddle](http://griddlegriddle.github.io/Griddle/) React component

### Installation

- `meteor add utilities:meteor-griddle`
- `npm install --save griddle-react`

### Usage

#### React Component

```
import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';
```

The `<MeteorGriddle/>` React component takes the same options as `<Griddle/>`, plus a couple extra ones:

##### Options

- `publication`: the publication that will provide the data
- `collection`: the collection to display
- `matchingResultsCount`: the name of the matching results counter
- `filteredFields`: an array of fields to search through when filtering

##### Example

```jsx
  <MeteorGriddle
    publication="adminUsers"
    collection={Meteor.users}
    matchingResultsCount="matching-users"
    filteredFields={["email", "username", "emails.address", "services.meteor-developer.username"]}
  />
```

You'll usually want to pass along some of Griddle's [own options](http://griddlegriddle.github.io/Griddle/properties.html), too.

##### Loading Message Customization

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

#### Publication

To use Griddle, you need to define a publication in your own codebase. That publication takes two `query` and `options` arguments from the client.

##### Example

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

##### Notes

- The publication should publish a count of matching results using the [Publish Counts](https://github.com/percolatestudio/publish-counts) package.
- Note that [an issue with the Publish Counts package](https://github.com/percolatestudio/publish-counts/issues/58) prevents you from reusing the same cursor.
- You're trusted to make your own security checks on the `query` and `options` arguments.
