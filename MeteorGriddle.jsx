import React from "react";
import Griddle from "griddle-react";

MeteorGriddle = React.createClass({

  propTypes: {
    publication: React.PropTypes.string, // the publication that will provide the data
    collection: React.PropTypes.object, // the collection to display
    matchingResultsCount: React.PropTypes.string, // the name of the matching results counter
    filteredFields: React.PropTypes.array // an array of fields to search through when filtering
    // plus regular Griddle props
  },

  mixins: [ReactMeteorData],
  
  getInitialState() {

    // 
    return {
      currentPage: 0,
      maxPages: 0,
      externalResultsPerPage: this.props.externalResultsPerPage,
      externalSortColumn: this.props.externalSortColumn,
      externalSortAscending: this.props.externalSortAscending,
      filter: null
    };

  },

  getMeteorData() {

    var query = {};

    // get a count of the number of items matching the current filter
    // if no filter is set it will return the total number of items in the collection
    var matchingResults = Counts.get(this.props.matchingResultsCount);

    var options = {
      limit: this.state.externalResultsPerPage,
      sort: {},
    };

    // filtering
    if (this.state.filter) {

      // if filteredFields are not defined, default to using columns
      var filteredFields = this.props.filteredFields || this.props.columns;

      // if necessary, limit the cursor to number of matching results to avoid displaying results from other publications
      options.limit = _.min([options.limit, matchingResults]);

      // build array for filtering using regex
      var orArray = filteredFields.map((field) => {
        var filterItem = {};
        filterItem[field] = {$regex: this.state.filter, $options: 'i'};
        return filterItem;
      });
      query = {$or: orArray};
      
    }

    // sorting
    options.sort[this.state.externalSortColumn] = this.state.externalSortAscending ? 1 : -1;
    
    // skipping
    var skip = this.state.currentPage * this.state.externalResultsPerPage;

    // we extend options with skip before passing them to publication
    Meteor.subscribe(this.props.publication, query, _.extend({skip: skip}, options));

    // create the cursor
    var results = this.props.collection.find(query, options).fetch();

    // return data
    return {
      results: results,
      matchingResults: matchingResults
    }
  },

  //what page is currently viewed
  setPage(index) {
    this.setState({currentPage: index});
  },

  //this changes whether data is sorted in ascending or descending order
  changeSort(sort, sortAscending) {
    this.setState({externalSortColumn: sort, externalSortAscending: sortAscending});
  },

  //this method handles the filtering of the data
  setFilter(filter) {
    this.setState({filter: filter});
  },

  //this method handles determining the page size
  setPageSize(size) {
    this.setState({externalResultsPerPage: size});
  },

  render() {

    // figure out how many pages we have based on the number of total results matching the cursor
    var maxPages = Math.round(this.data.matchingResults/this.state.externalResultsPerPage);

    return (
      <Griddle
        {...this.props}
        tableClassName="table"
        results={this.data.results}
        columnMetadata={this.props.columnMetadata}
        externalSetPage={this.setPage}
        externalChangeSort={this.changeSort}
        externalSetFilter={this.setFilter}
        externalSetPageSize={this.setPageSize}
        externalMaxPage={maxPages}
        externalCurrentPage={this.state.currentPage} 
        resultsPerPage={this.state.externalResultsPerPage} 
        externalSortColumn={this.state.externalSortColumn} 
        externalSortAscending={this.state.externalSortAscending}
      />
    )
  }

});