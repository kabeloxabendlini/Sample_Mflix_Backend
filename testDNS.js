import dns from 'dns';
import { promisify } from 'util';

const lookup = promisify(dns.lookup);

async function testDNS() {
    try {
        console.log('Testing Google DNS...');
        const google = await lookup('google.com');
        console.log(' Google resolved:', google);

        console.log('\nTesting MongoDB DNS...');
        const mongo = await lookup('moviereviews.nwqbw3y.mongodb.net');
        console.log(' MongoDB resolved:', mongo);
    } catch (error) {
        console.error(' DNS Error:', error.message);
        console.error('Full error:', error);
    }
}

testDNS();
