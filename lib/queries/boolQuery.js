'use strict';

/**
 * @class  ElasticSearch boolean query.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/query-dsl-bool-query.html}
 */
function BoolQuery() {
  this.bool = {};
}

module.exports = BoolQuery;

BoolQuery.prototype.must = function must(queries) {
  if (!queries) return this;

  if (!this.bool.must) this.bool.must = [];
  this.bool.must = this.bool.must.concat(queries);

  return this;
};

BoolQuery.prototype.mustNot = function mustNot(queries) {
  if (!queries) return this;

  if (!this.bool.must_not) this.bool.must_not = [];
  this.bool.must_not = this.bool.must_not.concat(queries);

  return this;
};

BoolQuery.prototype.should = function should(queries) {
  if (!queries) return this;

  if (!this.bool.should) this.bool.should = [];
  this.bool.should = this.bool.should.concat(queries);

  return this;
};

/**
 * Set query boost.
 * @param {number} boostFactor Number, string representation
 *                             of number, or undefined to unset.
 */
BoolQuery.prototype.setBoost = function setBoost(boostFactor) {
  this.bool.boost = boostFactor;
  return this;
}