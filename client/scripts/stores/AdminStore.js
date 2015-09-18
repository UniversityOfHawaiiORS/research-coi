import {AdminActions} from '../actions/AdminActions';
import {AutoBindingStore} from './AutoBindingStore';
import alt from '../alt';
import request from 'superagent';

const PAGE_SIZE = 40;

class _AdminStore extends AutoBindingStore {
  constructor() {
    super(AdminActions);

    // initialize state here
    this.applicationState = {
      sort: 'SUBMITTED_DATE',
      sortDirection: 'ASCENDING',
      filters: {
        date: {
          start: undefined,
          end: undefined
        },
        submittedBy: undefined,
        status: [],
        type: [],
        search: ''
      },
      effectiveSearchValue: '',
      showFiltersOnMobile: false,
      showingApproval: false,
      showingRejection: false,
      showingQuestionnaireComments: false,
      showingEntitiesComments: false,
      showingProjectComments: false,
      selectedDisclosure: undefined,
      loadingMore: false,
      offset: 0,
      loadedAll: false,
      summaryCount: 0
    };

    this.disclosureSummaries = [];

    this.refreshDisclosures();
  }

  morePossibleSummaries(summaries) {
    return summaries.length !== 0 && summaries.length % PAGE_SIZE === 0;
  }

  loadSummaryCount() {
    request.get('/api/coi/disclosure-summaries/count')
           .query({filters: encodeURIComponent(JSON.stringify(this.applicationState.filters))})
           .end((err, theCount) => {
             if (!err) {
               this.applicationState.summaryCount = theCount.body[0].rowcount;
               this.applicationState.loadedAll = this.disclosureSummaries.length === this.applicationState.summaryCount;
               this.emitChange();
             }
           });
  }

  refreshDisclosures() {
    this.applicationState.offset = 0;
    this.applicationState.loadingMore = true;

    request.get('/api/coi/disclosure-summaries')
           .query({sortColumn: this.applicationState.sort})
           .query({sortDirection: this.applicationState.sortDirection})
           .query({filters: encodeURIComponent(JSON.stringify(this.applicationState.filters))})
           .query({start: this.applicationState.offset})
           .end((err, summaries) => {
             if (!err) {
               this.disclosureSummaries = summaries.body;
               this.applicationState.loadingMore = false;
               if (this.morePossibleSummaries(this.disclosureSummaries)) {
                 this.loadSummaryCount();
               }
               else {
                 this.applicationState.summaryCount = this.disclosureSummaries.length;
                 this.applicationState.loadedAll = true;
               }

               this.emitChange();
             }
           });
  }

  loadDisclosure(id) {
    request.get('/api/coi/disclosures/' + id)
           .end((err, disclosure) => {
             if (!err) {
               this.applicationState.selectedDisclosure = disclosure.body;
               this.emitChange();
             }
           });
  }

  changeSort(newSortField) {
    this.applicationState.sort = newSortField;
    this.applicationState.sortDirection = 'ASCENDING';
    this.refreshDisclosures();
    return false;
  }

  flipSortDirection() {
    if (this.applicationState.sortDirection === 'DESCENDING') {
      this.applicationState.sortDirection = 'ASCENDING';
    }
    else {
      this.applicationState.sortDirection = 'DESCENDING';
    }

    this.refreshDisclosures();
    return false;
  }

  setSortDirection(newDirection) {
    this.applicationState.sortDirection = newDirection;
  }

  changeSearch(newSearch) {
    let shouldRefresh = newSearch.length > 2 || this.applicationState.filters.search.length > newSearch.length;
    this.applicationState.filters.search = newSearch;
    if (shouldRefresh) {
      this.applicationState.effectiveSearchValue = newSearch;
      this.refreshDisclosures();
      return false;
    }
  }

  doSearch() {
    this.applicationState.effectiveSearchValue = this.applicationState.filters.search;
    this.refreshDisclosures();
  }

  changeTypeFilter(newFilter) {
    this.applicationState.filters.type = newFilter;
  }

  setStartDateFilter(newValue) {
    this.applicationState.filters.date.start = newValue;
    this.refreshDisclosures();
  }

  setEndDateFilter(newValue) {
    this.applicationState.filters.date.end = newValue;
    this.refreshDisclosures();
  }

  clearDateFilter() {
    this.applicationState.filters.date.start = undefined;
    this.applicationState.filters.date.end = undefined;
    this.refreshDisclosures();
  }

  changeSubmittedByFilter(newFilter) {
    this.applicationState.filters.submittedBy = newFilter;
  }

  changeReporterFilter(newFilter) {
    this.applicationState.filters.reporterName = newFilter;
  }

  toggleMobileFilters() {
    this.applicationState.showFiltersOnMobile = !this.applicationState.showFiltersOnMobile;
  }

  toggleApprovalConfirmation() {
    this.applicationState.showingApproval = !this.applicationState.showingApproval;
  }

  toggleRejectionConfirmation() {
    this.applicationState.showingRejection = !this.applicationState.showingRejection;
  }

  showProjectComments() {
    this.applicationState.showingProjectComments = true;
  }

  showQuestionnaireComments() {
    this.applicationState.showingQuestionnaireComments = true;
  }

  showEntitiesComments() {
    this.applicationState.showingEntitiesComments = true;
  }

  hideProjectComments() {
    this.applicationState.showingProjectComments = false;
  }

  hideQuestionnaireComments() {
    this.applicationState.showingQuestionnaireComments = false;
  }

  hideEntitiesComments() {
    this.applicationState.showingEntitiesComments = false;
  }

  clearTypeFilter() {
    this.applicationState.filters.type = [];
    this.refreshDisclosures();
  }

  toggleTypeFilter(toToggle) {
    let index = this.applicationState.filters.type.findIndex(filter => {
      return filter === toToggle;
    });
    if (index === -1) {
      this.applicationState.filters.type.push(toToggle);
    }
    else {
      this.applicationState.filters.type.splice(index, 1);
    }

    this.refreshDisclosures();
  }

  clearStatusFilter() {
    this.applicationState.filters.status = [];
    this.refreshDisclosures();
  }

  toggleStatusFilter(toToggle) {
    let index = this.applicationState.filters.status.findIndex(filter => {
      return filter === toToggle;
    });
    if (index === -1) {
      this.applicationState.filters.status.push(toToggle);
    }
    else {
      this.applicationState.filters.status.splice(index, 1);
    }

    this.refreshDisclosures();
  }

  loadMore() {
    if (this.applicationState.loadedAll) {
      return false;
    }

    this.applicationState.loadingMore = true;
    this.applicationState.offset += PAGE_SIZE;

    request.get('/api/coi/disclosure-summaries')
           .query({sortColumn: this.applicationState.sort})
           .query({sortDirection: this.applicationState.sortDirection})
           .query({filters: encodeURIComponent(JSON.stringify(this.applicationState.filters))})
           .query({start: this.applicationState.offset})
           .end((err, summaries) => {
             if (!err) {
               this.disclosureSummaries = this.disclosureSummaries.concat(summaries.body);
               this.applicationState.loadingMore = false;
               this.applicationState.loadedAll = this.disclosureSummaries.length === this.applicationState.summaryCount;

               this.emitChange();
             }
           });
  }
}

export let AdminStore = alt.createStore(_AdminStore, 'AdminStore');
