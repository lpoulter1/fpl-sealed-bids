type Player = {
  id: number;
  first_name: string;
  second_name: string;
  web_name: string;
  team: number;
  element_type: number;
  now_cost: number;
  news: string;
  news_added: string;
  chance_of_playing_this_round: number;
  chance_of_playing_next_round: number;
  value_form: number;
  value_season: number;
  cost_change_start: number;
  cost_change_event: number;
  cost_change_start_fall: number;
  cost_change_event_fall: number;
  in_dreamteam: boolean;
  dreamteam_count: number;
  selected_by_percent: number;
  form: number;
  transfers_out: number;
  transfers_in: number;
  transfers_out_event: number;
  transfers_in_event: number;
  loans_in: number;
  loans_out: number;
  loaned_in: number;
  loaned_out: number;
  total_points: number;
  event_points: number;
  points_per_game: number;
  ep_this: number;
  ep_next: number;
  special: boolean;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: number;
  creativity: number;
  threat: number;
  ict_index: number;
  ea_index: number;
};

type JSONResponse = {
  elements: Player[];
  errors?: Array<{ message: string }>;
};

type Props = {
  players: Player[];
};

function getPosition(element_type: number) {
  switch (element_type) {
    case 1:
      return "GK";
    case 2:
      return "DEF";
    case 3:
      return "MID";
    case 4:
      return "FWD";
    default:
      return "N/A";
  }
}

function Page({ players }: Props) {
  return (
    <table className="table-auto  text-center">
      <thead className="bg-gray-50 text-sm border-b">
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>Position</th>
          <th>Cost</th>
          <th>News</th>
          <th>Chance of playing this round</th>
          <th>Chance of playing next round</th>
          <th>Value form</th>
          <th>Value season</th>
          <th>Cost change start</th>
          <th>Cost change event</th>
          <th>Cost change start fall</th>
          <th>Cost change event fall</th>
          <th>In dreamteam</th>
          <th>Dreamteam count</th>
          <th>Selected by percent</th>
          <th>Form</th>
          <th>Transfers out</th>
          <th>Transfers in</th>
          <th>Transfers out event</th>
          <th>Transfers in event</th>
          <th>Loans in</th>
          <th>Loans out</th>
          <th>Loaned in</th>
          <th>Loaned out</th>
          <th>Total points</th>
          <th>Event points</th>
          <th>Points per game</th>
          <th>Ep this</th>
          <th>Ep next</th>
          <th>Special</th>
          <th>Minutes</th>
          <th>Goals scored</th>
          <th>Assists</th>
          <th>Clean sheets</th>
          <th>Goals conceded</th>
          <th>Own goals</th>
          <th>Penalties saved</th>
          <th>Penalties missed</th>
          <th>Yellow cards</th>
          <th>Red cards</th>
          <th>Saves</th>
          <th>Bonus</th>
          <th>Bps</th>
          <th>Influence</th>
          <th>Creativity</th>
          <th>Threat</th>
          <th>Ict index</th>
          <th>Ea index</th>              
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id}>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.web_name}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.team}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{getPosition(player.element_type)}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.now_cost}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.news}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.chance_of_playing_this_round}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.chance_of_playing_next_round}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.value_form}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.value_season}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.cost_change_start}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.cost_change_event}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.cost_change_start_fall}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.cost_change_event_fall}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.in_dreamteam}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.dreamteam_count}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.selected_by_percent}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.form}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.transfers_out}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.transfers_in}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.transfers_out_event}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.transfers_in_event}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.loans_in}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.loans_out}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.loaned_in}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.loaned_out}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.total_points}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.event_points}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.points_per_game}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.ep_this}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.ep_next}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.special}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.minutes}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.goals_scored}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.assists}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.clean_sheets}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.goals_conceded}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.own_goals}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.penalties_saved}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.penalties_missed}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.yellow_cards}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.red_cards}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.saves}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.bonus}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.bps}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.influence}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.creativity}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.threat}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.ict_index}</td>
            <td className="px-6 py-3 border-b text-xs text-grey-900">{player.ea_index}</td>           
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: JSONResponse = await res.json();

  // Pass data to the page via props
  return { props: { players: data.elements } };
}

export default Page;
