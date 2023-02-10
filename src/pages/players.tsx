import React from "react";
import { useTable } from "react-table";

type Player = {
  id: number;
  first_name: string;
  second_name: string;
  web_name: string;
  team: number;
  team_code: number;
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
  clean_sheets_per_90: number;
  goals_conceded: number;
  goals_conceded_per_90: number;
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
  expected_goals_conceded: string;
  expected_goals_conceded_per_90: number;
  corners_and_indirect_freekicks_text: string;
  corners_and_indirect_freekicks_order: number;
  direct_freekicks_order: number;
  direct_freekicks_text: string;
  expected_assists: string;
  expected_assists_per_90: number;
  expected_goal_involvements: string;
  expected_goal_involvements_per_90: number;
  expected_goals: number;
  starts: number;
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
  // all columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Player",
        accessor: "web_name",
      },
      {
        Header: "Position",
        accessor: "element_type",
        Cell: ({ value }) => getPosition(value),
      },
      {
        Header: "Team",
        accessor: "team",
      },
      {
        Header: "Total points",
        accessor: "total_points",
      },
      {
        Header: "News",
        accessor: "news",
      },
      {
        Header: "Chance of playing this round",
        accessor: "chance_of_playing_this_round",
      },
      {
        Header: "Chance of playing next round",
        accessor: "chance_of_playing_next_round",
      },
      {
        Header: "Ep this",
        accessor: "ep_this",
      },
      {
        Header: "Ep next",
        accessor: "ep_next",
      },
      {
        Header: "Value form",
        accessor: "value_form",
      },

      {
        Header: "Value season",
        accessor: "value_season",
      },
      {
        Header: "Selected by percent",
        accessor: "selected_by_percent",
      },
      {
        Header: "Form",
        accessor: "form",
      },
      {
        Header: "Event points",
        accessor: "event_points",
      },
      {
        Header: "Points per game",
        accessor: "points_per_game",
      },
      {
        Header: "Starts",
        accessor: "starts",
      },
      {
        Header: "Minutes",
        accessor: "minutes",
      },
      {
        Header: "Goals scored",
        accessor: "goals_scored",
      },
      {
        Header: "Assists",
        accessor: "assists",
      },
      {
        Header: "Clean sheets",
        accessor: "clean_sheets",
      },
      { Header: "Clean sheets p/90", accessor: "clean_sheets_per_90" },
      { Header: "Goals conceded", accessor: "goals_conceded" },
      { Header: "Own goals", accessor: "own_goals" },
      { Header: "Penalties saved", accessor: "penalties_saved" },
      { Header: "Penalties missed", accessor: "penalties_missed" },
      { Header: "Yellow cards", accessor: "yellow_cards" },
      { Header: "Red cards", accessor: "red_cards" },
      { Header: "Saves", accessor: "saves" },
      { Header: "Bonus", accessor: "bonus" },
      { Header: "Bps", accessor: "bps" },

      { Header: "Influence", accessor: "influence" },
      { Header: "Creativity", accessor: "creativity" },
      { Header: "Threat", accessor: "threat" },
      { Header: "Ict index</t", accessor: "ict_index" },

      {
        Header: "expected_goals_conceded",
        accessor: "expected_goals_conceded",
      },
      {
        Header: "corners_and_indirect_freekicks_text",
        accessor: "corners_and_indirect_freekicks_text",
      },
      {
        Header: "corners_and_indirect_freekicks_order",
        accessor: "corners_and_indirect_freekicks_order",
      },
      {
        Header: "direct_freekicks_order",
        accessor: "direct_freekicks_order",
      },
      { Header: "direct_freekicks_text", accessor: "direct_freekicks_text" },
      { Header: "expected_assists", accessor: "expected_assists" },
      {
        Header: "expected_assists_per_90",
        accessor: "expected_assists_per_90",
      },
      {
        Header: "expected_goal_involvements",
        accessor: "expected_goal_involvements",
      },
      {
        Header: "expected_goal_involvements_per_90",
        accessor: "expected_goal_involvements_per_90",
      },
      { Header: "expected_goals", accessor: "expected_goals" },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: players,
    });

  return (
    <table {...getTableProps()} className="table-auto  text-center">
      <thead className="border-b bg-gray-50 text-xs">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className="text-grey-900 border-b px-6 py-3 text-xs"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
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
