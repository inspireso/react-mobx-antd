/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import {Form} from 'antd';

/**
 * 映射字段到form表单
 * @param {object} record 要映射的记录
 * @param {map} propToFieldMap 对象属性和form表单字段名称的映射，{prop1: field1}
 * @returns {object}
 */
export function createFormFields(record, propToFieldMap) {
  if (!record || Object.keys(record).length === 0) {
    return {};
  }
  const keyMap = propToFieldMap || {};
  return Object.keys(propToFieldMap || record)
    .map(key => {
        let propKey = key;
        if (keyMap[key]) {
          propKey = propToFieldMap[key];
        }
        return {
          [propKey]: Form.createFormField({value: record[key]})
        }
      }
    )
    .reduce((a, b) => Object.assign(a, b))
}
