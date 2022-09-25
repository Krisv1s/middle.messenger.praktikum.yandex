type Indexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const lhsLink = lhs;
  const rhsLink = rhs;
  for (const p in rhsLink) {
    if (!Object.prototype.hasOwnProperty.call(rhsLink, p)) {
      continue;
    }

    try {
      if (rhsLink[p].constructor === Object) {
        rhsLink[p] = merge(lhsLink[p] as Indexed, rhsLink[p] as Indexed);
      } else {
        lhsLink[p] = rhsLink[p];
      }
    } catch (e) {
      lhsLink[p] = rhsLink[p];
    }
  }

  return lhsLink;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}

export default set;
