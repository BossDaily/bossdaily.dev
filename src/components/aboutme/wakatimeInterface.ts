export interface WakatimeData {
  data: Data;
}

export interface Data {
  id:                                                    string;
  user_id:                                               string;
  range:                                                 string;
  start:                                                 Date;
  end:                                                   Date;
  timeout:                                               number;
  writes_only:                                           boolean;
  timezone:                                              string;
  holidays:                                              number;
  status:                                                string;
  created_at:                                            Date;
  modified_at:                                           Date;
  editors:                                               Category[];
  best_day:                                              BestDay;
  human_readable_daily_average_including_other_language: string;
  is_already_updating:                                   boolean;
  human_readable_total:                                  string;
  days_including_holidays:                               number;
  daily_average:                                         number;
  is_up_to_date:                                         boolean;
  total_seconds:                                         number;
  projects:                                              Category[];
  operating_systems:                                     Category[];
  machines:                                              Category[];
  languages:                                             Category[];
  total_seconds_including_other_language:                number;
  daily_average_including_other_language:                number;
  percent_calculated:                                    number;
  human_readable_total_including_other_language:         string;
  is_stuck:                                              boolean;
  is_up_to_date_pending_future:                          boolean;
  human_readable_daily_average:                          string;
  dependencies:                                          Category[];
  categories:                                            Category[];
  days_minus_holidays:                                   number;
  is_cached:                                             boolean;
  username:                                              string;
  is_including_today:                                    boolean;
  human_readable_range:                                  string;
  is_coding_activity_visible:                            boolean;
  is_language_usage_visible:                             boolean;
  is_editor_usage_visible:                               boolean;
  is_category_usage_visible:                             boolean;
  is_os_usage_visible:                                   boolean;
}

export interface BestDay {
  date:          Date;
  total_seconds: number;
  text:          string;
}

export interface Category {
  name:             string;
  total_seconds:    number;
  percent:          number;
  digital:          string;
  decimal:          string;
  text:             string;
  hours:            number;
  minutes:          number;
  machine_name_id?: string;
}
