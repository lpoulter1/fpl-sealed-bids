import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

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
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<Player>[]>(
    () => [
      {
        header: "Player",
        accessorKey: "web_name",
      },
      {
        header: "Position",
        accessorKey: "element_type",
        Cell: ({ value }: { value: number }) => getPosition(value),
      },
      {
        header: "Team",
        accessorKey: "team",
      },
      {
        header: "Total points",
        accessorKey: "total_points",
      },
      {
        header: "News",
        accessorKey: "news",
      },
      {
        header: "Chance of playing this round",
        accessorKey: "chance_of_playing_this_round",
      },
      {
        header: "Chance of playing next round",
        accessorKey: "chance_of_playing_next_round",
      },
      {
        header: "Ep this",
        accessorKey: "ep_this",
      },
      {
        header: "Ep next",
        accessorKey: "ep_next",
      },
      {
        header: "Value form",
        accessorKey: "value_form",
      },

      {
        header: "Value season",
        accessorKey: "value_season",
      },
      {
        header: "Selected by percent",
        accessorKey: "selected_by_percent",
      },
      {
        header: "Form",
        accessorKey: "form",
      },
      {
        header: "Event points",
        accessorKey: "event_points",
      },
      {
        header: "Points per game",
        accessorKey: "points_per_game",
      },
      {
        header: "Starts",
        accessorKey: "starts",
      },
      {
        header: "Minutes",
        accessorKey: "minutes",
      },
      {
        header: "Goals scored",
        accessorKey: "goals_scored",
      },
      {
        header: "Assists",
        accessorKey: "assists",
      },
      {
        header: "Clean sheets",
        accessorKey: "clean_sheets",
      },
      { header: "Clean sheets p/90", accessorKey: "clean_sheets_per_90" },
      { header: "Goals conceded", accessorKey: "goals_conceded" },
      { header: "Own goals", accessorKey: "own_goals" },
      { header: "Penalties saved", accessorKey: "penalties_saved" },
      { header: "Penalties missed", accessorKey: "penalties_missed" },
      { header: "Yellow cards", accessorKey: "yellow_cards" },
      { header: "Red cards", accessorKey: "red_cards" },
      { header: "Saves", accessorKey: "saves" },
      { header: "Bonus", accessorKey: "bonus" },
      { header: "Bps", accessorKey: "bps" },

      { header: "Influence", accessorKey: "influence" },
      { header: "Creativity", accessorKey: "creativity" },
      { header: "Threat", accessorKey: "threat" },
      { header: "Ict index</t", accessorKey: "ict_index" },

      {
        header: "expected_goals_conceded",
        accessorKey: "expected_goals_conceded",
      },
      {
        header: "corners_and_indirect_freekicks_text",
        accessorKey: "corners_and_indirect_freekicks_text",
      },
      {
        header: "corners_and_indirect_freekicks_order",
        accessorKey: "corners_and_indirect_freekicks_order",
      },
      {
        header: "direct_freekicks_order",
        accessorKey: "direct_freekicks_order",
      },
      { header: "direct_freekicks_text", accessorKey: "direct_freekicks_text" },
      { header: "expected_assists", accessorKey: "expected_assists" },
      {
        header: "expected_assists_per_90",
        accessorKey: "expected_assists_per_90",
      },
      {
        header: "expected_goal_involvements",
        accessorKey: "expected_goal_involvements",
      },
      {
        header: "expected_goal_involvements_per_90",
        accessorKey: "expected_goal_involvements_per_90",
      },
      { header: "expected_goals", accessorKey: "expected_goals" },
    ],
    []
  );

  const table = useReactTable({
    data: players,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <table className="table-auto  text-center">
      <thead className="border-b bg-gray-50 text-xs">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table
          .getRowModel()
          .rows.slice(0, 10)
          .map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="text-grey-900 border-b px-6 py-3 text-xs"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
