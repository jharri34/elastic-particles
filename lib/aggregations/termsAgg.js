'use strict';
var Aggregation = require('./aggregation');

/**
 * Elasticsearch metrics aggregation that calculates an approximate count of distinct values for a field.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-cardinality-aggregation.html}
 * @param {string} field  Name of field to aggregate on.
 * @param {int}    size   Aggregation size for number of buckets to return.
 *                        Size 0 returns all buckets.
 */
function TermsAgg(field, size) {
  if (!field) {
    throw new Error('Terms aggregation requires an aggregation field');
  }

  Aggregation.call(this, 'terms', field);
  if (size || size === 0) {
    this._root.size = size;
  }
}

TermsAgg.prototype = Object.create(Aggregation.prototype);
TermsAgg.prototype.constructor = TermsAgg;

/**
 * @override
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation.
 * @default '{{field}}Terms'
 */
TermsAgg.prototype.getName = function getTermsName() {
  return this._name || this._root.field + 'Terms';
};

module.exports = TermsAgg;