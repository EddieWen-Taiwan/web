const ENG = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUM = '1234567890';

const all = `${ENG}${ENG.toLowerCase()}${NUM}`;

let folder = '';

for( let i = 0; i < 7; i++ ) {
	const position = Math.floor(Math.random() * 62);
	folder += all.substr(position, 1);
}

export default folder;
