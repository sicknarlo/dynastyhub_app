import React from 'react';
import chart from './chart.png';
import ContentComponent from '../ContentComponent';

export default () => {
 return (
   <ContentComponent>
    <h1>Frequently Asked Questions</h1>
    <div>
      <h3>Philosophy and Goals</h3>
      <ul>
        <li>Assets in dynasty fantasy football can be treated like most other assets -- you should know how to value them, and always be seeking to increase your total value</li>
        <li>There is an opportunity cost to everything, and that cost needs to be reflected in how you value assets. I like to call this the "Pawn Stars" rule -- sure I'll get a good player with that 1st round pick that is 3 years out, but it's going to sit on my shelf until I trade it or make the pick, and that cost has to play into the asset's value.</li>
        <li>Studs are a premium, and you should be careful splitting premium players up into lesser assets.</li>
        <li>There is a lot of information out there. If you're looking for advanced statistics that are going to make you overpay for DeAndre Smelter because he has huge hands, you won't find that here. We'll try to stick to actionable information that is digestable and usable by most players.</li>
        <li>Do a few things, and do them well. Past iterations have suffered from trying to do too much, with the app becoming slow and unmaintainable as a result.</li>
      </ul>
    </div>
    <div>
      <h3>What is DynastyFFTools?</h3>
      <p>DynastyFFTools started in 2014 as an Excel sheet as an attempt to create a consistent, objective valuation system based on player ADP. In it's current form it is a place you can get a lot of information on how to value players in one spot -- from our own personal values, the latest ADP, dynasty news, and more.</p>
    </div>
    <div>
      <h3>What is Average Draft Position? Why is yours different?</h3>
      <p>Average draft position is, quite simply, an average of a sample of drafts -- mock or otherwise -- that give you a snapshot of where the community is drafting players.</p>
      <p>Because dynasty is a relatively niche format, typically ADP comes from small sample sizes of curated mock drafts conducted regularly, and the average of those drafts being assigned to a player. What we do is get actual startup drafts being conducted year round on MyFantasyLeague and create a rolling ADP value based on all drafts within 30 days, giving you an up to date snapshot of where a player is valued. Because we have such a larger sample size of uncurated data, we also use the median of these values instead of the average, so when someone drafts Matt Barkley and meant to draft Saquon, both player's ADP (or more accurately Median Draft Position) are not significantly affected.</p>
    </div>
    <div>
      <h3>How do I use DynastyFFTools?</h3>
      <p>DynastyFFTools has always been intended to be a single tool in the box -- something to help people evaluate values and trades, while not dictating any one way or taking a dogmatic approach to value. The latest iteration emphasizes this philosophy, providing not only the popular dynasty trade calculator and Player Values, but a ton of other tools and insights to help users come to their own conclusions. This means that even seasoned users who don't have any use for typical trade calculators should still find use for the information found here.</p>
    </div>
    <div>
      <h3>How do you come up with your values?</h3>
      <img src={chart} alt="DynastyFFTools Value Chart" style={{ maxWidth: '100%' }}/>
      <p>The main two pillars of the DynastyFFTools value philosophy are: Values are based on some sort of datapoint (never on my own rankings or feelings) and values should decrease significantly along a log1/2(X) regression line to represent the premium studs have. The current formula is the product of a lot of tinkering to find a good balance, and while it's not perfect, it's what I use to roughly value players when I play.</p>
    </div>
    <div>
      <h3>Where do rookie pick values come from? Future picks?</h3>
      <p>Placing values on picks is tricky. Not everyone is a fan how we create our values, but the basic philosophy of how we value future picks is something we feel strongly about.</p>
      <p>Rookie picks become available 3 years out from the draft. Once rookies start being drafted in startups, the upcoming rookie picks are based directly on the correlating rookie -- the first rookie off the board is the pick of the Pick 1, the second off PIck 2 etc through 48 picks.</p>
      <p>Future picks are based on the median value of the last 50 rookie picks at that position. This is to avoid specific picks being overvalued by exceptional players. For example, you shouldn't expect the 2019 1.01 to be valued based on Barkley. Instead they're based on a sample of values going back to 2012 to get a better estimate of value. Future picks are devalued by 15%, 20%, and 25% for each year out (Pawn Stars rule).</p>
      <p>Generic picks are based on Expected Value. For example, the 2019 1st is based on the EV of all the picks in the 2019 1st round. The 2020 Early 2nd is the EV of picks 13-16 in the 2020 draft. And so on. Rounds are based on 12 team leagues.</p>
      <p>This sometimes could result in weirdness, such as a current year pick being worth less than a future year despite the value degredation. This is intentional and meant to reflect the difference in feeling the community has in the current years draft vs what they typically feel historically.</p>
    </div>
   </ContentComponent>
 )
}
