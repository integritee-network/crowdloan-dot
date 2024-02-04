import './css/App.css';
import { Container, Grid } from 'semantic-ui-react';
import { useGlobalState } from './state';

export default function EarlySporter (props) {
  const [crowdLoanRunning] = useGlobalState('crowdLoanRunning');
  return (
        <div className="EarlySporter">
            <Container>
                <div className="text">
                    <Grid>
                        <Grid.Row columns={1}>
                        <Grid.Column>
                            <span>EARLY SUPPORTER BONUS</span>
                            <h2>Back Integritee Early &amp;  <br />Get a 20% Bonus Reward</h2>
                            <p>
                            It’s easy to follow the crowd, but some can see the future before everyone else.
                            </p>
                            <p>
                            That’s why we are rewarding the early pioneers. Back us in the first 72h before February 10th 09:00
GMT and receive a 20% Early Supporter Bonus. This will be added to your standard Supporter
Reward, which is proportional to your DOT contribution. The more you bond before the
deadline, the more TEER tokens you will be eligible to receive.
                            </p>

                            <br />

                            {crowdLoanRunning &&
                            <a className='ui primary gradient-btn button' style={{ lineHeight: '1.5' }} href='#participate' 
                            style={{
                                borderRadius: '12px',
                                background: 'linear-gradient(85deg, #559CFF 0%, #9E20FE 100%)',
                                backdropFilter: 'blur(30px)',
                                display: 'inline-flex',
                                padding: '14px 24px',
                                alignItems: 'flex-start',
                                fontSize: '18px',
                                gap: '10px'
                              }}>
                            
                                Participate Now!
                            </a>
                            }
                            {!crowdLoanRunning &&
                            <a className="ui primary gradient-btn button" style={{ lineHeight: '1.5' }} href="https://mailchi.mp/integritee/get-notified">Get Notified!</a>
                            }

                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </div>
  );
}
