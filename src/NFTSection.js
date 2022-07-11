import React from 'react';
import './css/App.css';
import { Container, Grid, GridRow, TableBody } from 'semantic-ui-react';
import number1 from './Images/NFT-Section/numbers-1.png';
import number2 from './Images/NFT-Section/numbers-2.png';
import number3 from './Images/NFT-Section/numbers-3.png';
import number4 from './Images/NFT-Section/numbers-4.png';
import twitternft from './Images/NFT-Section/twitter.png';
import telegramnft from './Images/NFT-Section/telegram.png';
import discordnft from './Images/NFT-Section/discord.png';
import mediumnft from './Images/NFT-Section/medium.png';

export default function NFTsection (props) {
  return (
        <div className="white-bg" id="nftsection" style={{ backgroundColor: '#eff3f6' }}>
            <Container>
                <div className="text">
                    <Grid>
                        <GridRow columns={1} style={{ width: '70%!important' }}>
                            <Grid.Column>
                                <span>INTEGRITEE NFT</span>

                                <h2>How To Claim Your Exclusive <br />Integritee Early Supporter NFT</h2>
                            </Grid.Column>
                        </GridRow>

                        <Grid.Row columns={2}>
                        <Grid.Column>

                            <p>
                            All our early supporters are entitled to an exclusive Integritee non-fungible token (NFT).
                            Getting in on the action is easy — simply contribute atleast 5 DOT to our
                            Polkadot crowdloan campaign and help spread the word on social media to claim your
                            Integritee Early Supporter NFT. This will entitle you to benefit from future
                            programs and special bonuses, so don’t miss your chance.
                            </p>

                            <p style={{ fontWeight: '600', color: '#000065' }}> What’s it all about? </p>
                            <p>
                            Integritee is a platform that enables developers and firms to securely pro
                            cess sensitive data confidentially. It achieves this by combining the
                            trust of Polkadot/Kusama blockchain with the speed and confidentiality
                            of trusted execution environment (TEE) hardware. Integritee is taking
                            part in the Polkadot auctions to secure a parachain, which will be used to
                            verify TEE hardware in a way that can be audited by anyone.
                            This will provide all users with assurance that their data is only being
                            processed in pre-agreed ways in an isolated and trustworthy hardware environment.
                            </p>

                            <p style={{ fontWeight: '600', color: '#000065' }}>How to claim your NFT? </p>
                            <p>
                            We will be rewarding all supporters of our crowdloan campaign with their own,
                            exclusive Integritee Early Supporter NFT.
                            Follow the instructions on the right to claim yours:
                            </p>

                        </Grid.Column>
                        <Grid.Column>
                            <table>
                                <TableBody>
                                    <tr style={{ lineHeight: '60px' }}>
                                        <td style={{ width: '10%' }}>
                                        <img src={number1} alt='icon' width={25} />
                                        </td>
                                        <td style={{ width: '90%' }}>
                                       <p style={{ fontWeight: '600' }}>Contribute 5 DOT or more to the Integritee Crowdloan Campaign. &nbsp;
                                       {/* <a href='#participate' style={{color:'#70e6da', textDecoration:'underline', fontWeight:'600'}}>
                                           Simply follow the instructions here.
                                       </a> */}
                                       </p>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '10%' }}>
                                        <img src={number2} width={25} alt='icon' />
                                        </td>
                                        <td style={{ width: '90%' }}>
                                       <p style={{ fontWeight: '600' }}> Join &amp; follow our groups and social channels. </p>
                                        </td>
                                    </tr>
                                    <tr style={{ lineHeight: '30px' }}>
                                        <td>

                                        </td>
                                        <td>
                                            <a href='https://discord.com/invite/anhtxwr4eS'>
                                             <img alt='icon' src={discordnft} width={35} style={{ marginRight: '30px' }} />
                                            </a>

                                            <a href='https://t.me/Integritee_Official'>
                                            <img alt='icon' src={telegramnft} width={35} style={{ marginRight: '30px' }} />
                                            </a>

                                            <a href='https://medium.com/integritee'>
                                            <img alt='icon' src={mediumnft} width={35} />
                                            </a>
                                        </td>

                                    </tr>
                                    <tr style={{ lineHeight: '30px' }}>
                                        <td style={{ width: '10%' }}>
                                        <img alt='icon' src={number3} width={25} />
                                        </td>
                                        <td style={{ width: '90%' }}>
                                      <p style={{ fontWeight: '600' }}>  Follow Integritee on Twitter and write or repost at least 3 tweets mentioning @integritee.
                                        </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>

                                        </td>
                                        <td>
                                            <a href='https://twitter.com/integri_t_e_e'>
                                            <img alt='icon' src={twitternft} width={35} />
                                            </a>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td style={{ width: '10%' }}>
                                        <img alt="icon" src={number4} width={25} />
                                        </td>
                                        <td style={{ width: '90%' }}>
                                        <p style={{ fontWeight: '600' }}>Enter your DOT address and social media handles into the&nbsp;
                                            <a href='https://docs.google.com/forms/d/e/1FAIpQLScevKkV4kEG6e1SjSAqkWdanzOJuSvsYzEPCQ3JRWWRC5UNAQ/viewform'
                                            style={{ color: '#70e6da', textDecoration: 'underline', fontWeight: '600' }}
                                            >Google Form.</a>

                                            </p>
                                        </td>
                                    </tr>

                                </TableBody>
                                </table>
                                <br/>
                                <br/>
                               <p style={{ fontWeight: '600' }}>
                               The NFT will be distributed soon after the end of the Integritee Crowdloan Campaign.
                               </p>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
  );
}
