try {
  require.resolve('next/dist/bin/next');
  require('next/dist/bin/next');
} catch (e) {
  console.log('Skipping build because Next.js is not installed.');
}
