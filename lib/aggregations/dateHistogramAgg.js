'use strict';
var Aggregation = require('./aggregation');
var _ = require('lodash');

/**
 * Elasticsearch multi-bucket aggregation that groups by dates.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-datehistogram-aggregation.html}
 * @param {string} field      Name of field to aggregate on.
 * @param {string} interval   One of: year, quarter, month, week, day, hour, minute, or second
 * @param {string} format     Date format pattern {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern}
 */

var validIntervals = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second'];

function DateHistogramAgg(field, interval, format) {
  if (!field) {
    throw new Error('Cardinality aggregation requires an aggregation field');
  }

  if (!_.contains(validIntervals, interval)) {
    throw new Error('Date histogram requires a valid date interval (ex: "month")');
  }

  Aggregation.call(this, 'date_histogram', field);
  this._root.interval = interval;

  if (format) {
    this._root.format = format;
  }
}

DateHistogramAgg.prototype = Object.create(Aggregation.prototype);
DateHistogramAgg.prototype.constructor = DateHistogramAgg;

/**
 * @override
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation.
 * @default '{{field}}DateHistogram'
 */
DateHistogramAgg.prototype.getName = function getDateHistogramName() {
  return this._name || this._root.field + 'DateHistogram';
};

module.exports = DateHistogramAgg;