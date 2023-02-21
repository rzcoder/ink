import React from 'react';
import test from 'ava';
import boxen, {Options} from 'boxen';
import {renderToString} from './helpers/render-to-string';
import {Box, Text} from '../src';

const box = (text: string, options?: Options): string => {
	return boxen(text, {
		...options,
		borderStyle: 'round'
	});
};

test('overflowX - single text node', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden">
			<Box width={12} flexShrink={0}>
				<Text>Hello World</Text>
			</Box>
		</Box>
	);

	t.is(output, 'Hello');
});

test('overflowX  - single text node inside a box with border', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden" borderStyle="round">
			<Box width={12} flexShrink={0}>
				<Text>Hello World</Text>
			</Box>
		</Box>
	);

	t.is(output, box('Hell'));
});

test('overflowX - multiple text nodes', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden">
			<Box width={12} flexShrink={0}>
				<Text>Hello </Text>
				<Text>World</Text>
			</Box>
		</Box>
	);

	t.is(output, 'Hello');
});

test('overflowX - multiple text nodes inside a box with border', t => {
	const output = renderToString(
		<Box width={8} overflowX="hidden" borderStyle="round">
			<Box width={12} flexShrink={0}>
				<Text>Hello </Text>
				<Text>World</Text>
			</Box>
		</Box>
	);

	t.is(output, box('Hello '));
});

test('overflowX - multiple boxes', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden">
			<Box width={6} flexShrink={0}>
				<Text>Hello </Text>
			</Box>
			<Box width={6} flexShrink={0}>
				<Text>World</Text>
			</Box>
		</Box>
	);

	t.is(output, 'Hello');
});

test('overflowX - multiple boxes inside a box with border', t => {
	const output = renderToString(
		<Box width={8} overflowX="hidden" borderStyle="round">
			<Box width={6} flexShrink={0}>
				<Text>Hello </Text>
			</Box>
			<Box width={6} flexShrink={0}>
				<Text>World</Text>
			</Box>
		</Box>
	);

	t.is(output, box('Hello '));
});

test('overflowX - box before left edge of container', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden">
			<Box marginLeft={-12} width={6} flexShrink={0}>
				<Text>Hello</Text>
			</Box>
		</Box>
	);

	t.is(output, '');
});

test('overflowX - box before left edge of container with border', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden" borderStyle="round">
			<Box marginLeft={-12} width={6} flexShrink={0}>
				<Text>Hello</Text>
			</Box>
		</Box>
	);

	t.is(output, box(' '.repeat(4)));
});

test('overflowX - box intersecting with left edge of container', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden">
			<Box marginLeft={-3} width={12} flexShrink={0}>
				<Text>Hello World</Text>
			</Box>
		</Box>
	);

	t.is(output, 'lo Wor');
});

test('overflowX - box intersecting with left edge of container with border', t => {
	const output = renderToString(
		<Box width={8} overflowX="hidden" borderStyle="round">
			<Box marginLeft={-3} width={12} flexShrink={0}>
				<Text>Hello World</Text>
			</Box>
		</Box>
	);

	t.is(output, box('lo Wor'));
});

test('overflowX - box after right container edge', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden">
			<Box marginLeft={6} width={6} flexShrink={0}>
				<Text>Hello</Text>
			</Box>
		</Box>
	);

	t.is(output, '');
});

test('overflowX - box intersecting with right container edge', t => {
	const output = renderToString(
		<Box width={6} overflowX="hidden">
			<Box marginLeft={3} width={6} flexShrink={0}>
				<Text>Hello</Text>
			</Box>
		</Box>
	);

	t.is(output, '   Hel');
});

test('overflowY - single text node', t => {
	const output = renderToString(
		<Box height={1} overflowY="hidden">
			<Text>Hello{'\n'}World</Text>
		</Box>
	);

	t.is(output, 'Hello');
});

test('overflowY - single text node inside a box with border', t => {
	const output = renderToString(
		<Box width={20} height={3} overflowY="hidden" borderStyle="round">
			<Text>Hello{'\n'}World</Text>
		</Box>
	);

	t.is(output, box('Hello'.padEnd(18, ' ')));
});

test('overflowY - multiple boxes', t => {
	const output = renderToString(
		<Box height={2} overflowY="hidden" flexDirection="column">
			<Box flexShrink={0}>
				<Text>Line #1</Text>
			</Box>
			<Box flexShrink={0}>
				<Text>Line #2</Text>
			</Box>
			<Box flexShrink={0}>
				<Text>Line #3</Text>
			</Box>
			<Box flexShrink={0}>
				<Text>Line #4</Text>
			</Box>
		</Box>
	);

	t.is(output, 'Line #1\nLine #2');
});

test('overflowY - multiple boxes inside a box with border', t => {
	const output = renderToString(
		<Box
			width={9}
			height={4}
			overflowY="hidden"
			flexDirection="column"
			borderStyle="round"
		>
			<Box flexShrink={0}>
				<Text>Line #1</Text>
			</Box>
			<Box flexShrink={0}>
				<Text>Line #2</Text>
			</Box>
			<Box flexShrink={0}>
				<Text>Line #3</Text>
			</Box>
			<Box flexShrink={0}>
				<Text>Line #4</Text>
			</Box>
		</Box>
	);

	t.is(output, box('Line #1\nLine #2'));
});

test('overflowY - box above top edge of container', t => {
	const output = renderToString(
		<Box height={1} overflowY="hidden">
			<Box marginTop={-2} height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, '');
});

test('overflowY - box above top edge of container with border', t => {
	const output = renderToString(
		<Box width={7} height={3} overflowY="hidden" borderStyle="round">
			<Box marginTop={-3} height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, box(' '.repeat(5)));
});

test('overflowY - box intersecting with top edge of container', t => {
	const output = renderToString(
		<Box height={1} overflowY="hidden">
			<Box marginTop={-1} height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, 'World');
});

test('overflowY - box intersecting with top edge of container with border', t => {
	const output = renderToString(
		<Box width={7} height={3} overflowY="hidden" borderStyle="round">
			<Box marginTop={-1} height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, box('World'));
});

test('overflowY - box below bottom edge of container', t => {
	const output = renderToString(
		<Box height={1} overflowY="hidden">
			<Box marginTop={1} height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, '');
});

test('overflowY - box below bottom edge of container with border', t => {
	const output = renderToString(
		<Box width={7} height={3} overflowY="hidden" borderStyle="round">
			<Box marginTop={2} height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, box(' '.repeat(5)));
});

test('overflowY - box intersecting with bottom edge of container', t => {
	const output = renderToString(
		<Box height={1} overflowY="hidden">
			<Box height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, 'Hello');
});

test('overflowY - box intersecting with bottom edge of container with border', t => {
	const output = renderToString(
		<Box width={7} height={3} overflowY="hidden" borderStyle="round">
			<Box height={2} flexShrink={0}>
				<Text>Hello{'\n'}World</Text>
			</Box>
		</Box>
	);

	t.is(output, box('Hello'));
});

test('overflow - single text node', t => {
	const output = renderToString(
		<Box paddingBottom={1}>
			<Box width={6} height={1} overflow="hidden">
				<Box width={12} height={2} flexShrink={0}>
					<Text>Hello{'\n'}World</Text>
				</Box>
			</Box>
		</Box>
	);

	t.is(output, 'Hello\n');
});

test('overflow - single text node inside container with border', t => {
	const output = renderToString(
		<Box paddingBottom={1}>
			<Box width={8} height={3} overflow="hidden" borderStyle="round">
				<Box width={12} height={2} flexShrink={0}>
					<Text>Hello{'\n'}World</Text>
				</Box>
			</Box>
		</Box>
	);

	t.is(output, `${box('Hello ')}\n`);
});

test('overflow - multiple boxes', t => {
	const output = renderToString(
		<Box paddingBottom={1}>
			<Box width={4} height={1} overflow="hidden">
				<Box width={2} height={2} flexShrink={0}>
					<Text>TL{'\n'}BL</Text>
				</Box>
				<Box width={2} height={2} flexShrink={0}>
					<Text>TR{'\n'}BR</Text>
				</Box>
			</Box>
		</Box>
	);

	t.is(output, 'TLTR\n');
});

test('overflow - multiple boxes inside container with border', t => {
	const output = renderToString(
		<Box paddingBottom={1}>
			<Box width={6} height={3} overflow="hidden" borderStyle="round">
				<Box width={2} height={2} flexShrink={0}>
					<Text>TL{'\n'}BL</Text>
				</Box>
				<Box width={2} height={2} flexShrink={0}>
					<Text>TR{'\n'}BR</Text>
				</Box>
			</Box>
		</Box>
	);

	t.is(output, `${box('TLTR')}\n`);
});

test('overflow - box intersecting with top left edge of container', t => {
	const output = renderToString(
		<Box width={4} height={4} overflow="hidden">
			<Box marginTop={-2} marginLeft={-2} width={4} height={4} flexShrink={0}>
				<Text>
					AAAA{'\n'}BBBB{'\n'}CCCC{'\n'}DDDD
				</Text>
			</Box>
		</Box>
	);

	t.is(output, 'CC\nDD\n\n');
});

test('overflow - box intersecting with top right edge of container', t => {
	const output = renderToString(
		<Box width={4} height={4} overflow="hidden">
			<Box marginTop={-2} marginLeft={2} width={4} height={4} flexShrink={0}>
				<Text>
					AAAA{'\n'}BBBB{'\n'}CCCC{'\n'}DDDD
				</Text>
			</Box>
		</Box>
	);

	t.is(output, '  CC\n  DD\n\n');
});

test('overflow - box intersecting with bottom left edge of container', t => {
	const output = renderToString(
		<Box width={4} height={4} overflow="hidden">
			<Box marginTop={2} marginLeft={-2} width={4} height={4} flexShrink={0}>
				<Text>
					AAAA{'\n'}BBBB{'\n'}CCCC{'\n'}DDDD
				</Text>
			</Box>
		</Box>
	);

	t.is(output, '\n\nAA\nBB');
});

test('overflow - box intersecting with bottom right edge of container', t => {
	const output = renderToString(
		<Box width={4} height={4} overflow="hidden">
			<Box marginTop={2} marginLeft={2} width={4} height={4} flexShrink={0}>
				<Text>
					AAAA{'\n'}BBBB{'\n'}CCCC{'\n'}DDDD
				</Text>
			</Box>
		</Box>
	);

	t.is(output, '\n\n  AA\n  BB');
});

test('nested overflow', t => {
	const output = renderToString(
		<Box paddingBottom={1}>
			<Box width={4} height={4} overflow="hidden" flexDirection="column">
				<Box width={2} height={2} overflow="hidden">
					<Box width={4} height={4} flexShrink={0}>
						<Text>
							AAAA{'\n'}BBBB{'\n'}CCCC{'\n'}DDDD
						</Text>
					</Box>
				</Box>

				<Box width={4} height={3}>
					<Text>
						XXXX{'\n'}YYYY{'\n'}ZZZZ
					</Text>
				</Box>
			</Box>
		</Box>
	);

	t.is(output, 'AA\nBB\nXXXX\nYYYY\n');
});
