import 'jest';
import HomeController from '../src/controllers/HomeController';
import FEHData from '../src/data/FEHData';

const express = require('express');
const supertest = require('supertest');

const app = express();
app.use('/', new HomeController().router);

const request = supertest(app);

// I fucking hate jest
jest.mock('../src/data/FEHData', () => {
  return {
    heroList: [{"id_tag":"PID_マルス","roman":"MARTH","face_name":"ch01_00_Marth_M_Normal","face_name2":"ch01_00_Marth_M_Normal","legendary":null,"dragonflowers":{"max_count":25,"costs":[10,20,30,40,60,80,110,140,170,200,40,80,120,160,200,40,80,120,160,200,40,80,120,160,200]},"timestamp":null,"id_num":5,"version_num":100,"sort_value":100100,"origins":2,"weapon_type":0,"tome_class":0,"move_type":0,"series":1,"random_pool":1,"permanent_hero":false,"base_vector_id":34,"refresher":false,"base_stats":{"hp":18,"atk":6,"spd":7,"def":6,"res":5},"growth_rates":{"hp":50,"atk":55,"spd":60,"def":50,"res":40},"skills":[["SID_鉄の剣",null,null,null,null,null,null,null,null,null,null,"SID_速さの紋章1",null,null],["SID_鉄の剣",null,null,null,null,null,"SID_鋼の剣",null,null,null,null,"SID_速さの紋章2",null,null],["SID_鋼の剣",null,null,null,null,null,"SID_銀の剣","SID_回り込み",null,null,"SID_離脱の行路1",null,null,null],["SID_銀の剣","SID_回り込み",null,null,null,null,null,null,null,null,"SID_離脱の行路2","SID_速さの紋章3",null,null],["SID_ファルシオン","SID_回り込み",null,null,null,null,null,null,null,null,"SID_離脱の行路3",null,null,null]]}],
    resplendentList: ["PID_マルス"],
    skillList: [{"id_tag":"SID_HP1","refine_base":null,"name_id":"MSID_HP1","desc_id":"MSID_H_HP1","refine_id":null,"beast_effect_id":null,"prerequisites":[null,null],"next_skill":"SID_HP2","sprites":[null,null,null,null],"stats":{"hp":3,"atk":0,"spd":0,"def":0,"res":0},"class_params":{"hp":0,"atk":0,"spd":0,"def":0,"res":0},"combat_buffs":{"hp":0,"atk":0,"spd":0,"def":0,"res":0},"skill_params":{"hp":0,"atk":0,"spd":0,"def":0,"res":0},"skill_params2":{"hp":0,"atk":0,"spd":0,"def":0,"res":0},"refine_stats":{"hp":0,"atk":0,"spd":0,"def":0,"res":0},"id_num":200,"sort_id":1000,"icon_id":4,"wep_equip":16777215,"mov_equip":15,"sp_cost":40,"category":3,"tome_class":0,"exclusive":false,"enemy_only":false,"range":0,"might":0,"cooldown_count":0,"assist_cd":false,"healing":false,"skill_range":0,"score":2,"promotion_tier":1,"promotion_rarity":4,"refined":false,"refine_sort_id":0,"wep_effective":0,"mov_effective":0,"wep_shield":0,"mov_shield":0,"wep_eff_weakness":0,"mov_eff_weakness":0,"wep_weakness":0,"mov_weakness":0,"wep_adaptive":0,"mov_adaptive":0,"timing_id":0,"ability_id":0,"limit1_id":0,"limit1_params":[0,0],"limit2_id":0,"limit2_params":[0,0],"target_wep":0,"target_mov":0,"passive_next":"SID_HP2","timestamp":null,"random_allowed":10,"min_lv":11,"max_lv":25,"tt_inherit_base":false,"random_mode":1,"limit3_id":0,"limit3_params":[0,0],"range_shape":0,"target_either":false,"distant_counter":false,"canto_range":0,"pathfinder_range":0,"arcane_weapon":false}],
    sealList: ["SID_HP1"],
  };
});

test('Test gettting home details', async () => {
  const res = await request.get('/home');

  // heroID is a randomly generated number
  expect(res.body.heroID).toEqual(expect.any(Number));

});
export {};