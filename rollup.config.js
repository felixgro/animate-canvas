import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/index.js',
			format: 'cjs',
			exports: 'named',
		},
		plugins: [typescript()],
	},
	{
		input: 'types/index.d.ts',
		output: {
			file: 'lib/index.d.ts',
			format: 'es',
			exports: 'named',
		},
		plugins: [dts()],
	},
];
