export const formatSalaryRange = (salary) => {
  if (!salary || isNaN(salary)) return "N/A";
  const lower = Math.floor(salary / 100000) * 10;
  const upper = lower + 10;
  return `${lower}k-${upper}k`;
};
