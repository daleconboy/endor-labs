/**
 * Utilities to support filtering resources for the mock data handlers
 */
import { Resource } from "./types";
import { getProperty } from "./utils";

const SUPPORTED_OPERATORS = ["==", "!="] as const;

type Filter = {
  key: string;
  selector: string[];
  operator: string;
  value: string;
};

export const parseFilter = (expression?: string): Filter | undefined => {
  if (!expression) return;

  const parts = expression.match(/(\w+(?:.\w+)?)\s*(==|!=)\s*?(.+)/);

  if (!parts) return;

  const [, key, operator, value] = parts;

  if (!SUPPORTED_OPERATORS.some((v) => v === operator)) {
    throw new Error("Failed to parse filter: unexpected operator " + operator);
  }

  return {
    key,
    selector: key.split("."),
    operator,
    value: value.trim()
  };
};

export const applyFilter = (list: Resource[], filter: Filter): Resource[] => {
  return list.filter((r) => {
    const target = getProperty(r, filter.selector);

    switch (filter.operator) {
      case "==":
        return target === filter.value;
      case "!=":
        return target !== filter.value;
    }
  });
};
