import type { NextApiRequest, NextApiResponse } from "next";

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

type BootstrapResponse = {
  elements: Player[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BootstrapResponse>
) {
  const response = await fetch(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );

  const json = await response.json() as BootstrapResponse;

  res.status(200).json(json);
}