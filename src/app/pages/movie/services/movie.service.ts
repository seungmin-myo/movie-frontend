import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";

export interface Employee {
  id: number;
  name: string;
  gender: string;
  birthDate: string | number | Date;
}

export class Agent {
  ID: number;

  Name: string;

  Phone: string;

  Picture: string;
}

export class House {
  id: number;

  title: string;

  rated: string;

  advanceTicketSale: String;

  openingDate: String;

  runningTime: String;

  genre: String

  description: String;

  image: string;

  agent: Agent;
}

const houses: House[] = [{
  id: 1,
  title: '마녀(魔女) Part2',
  advanceTicketSale: '27.6',
  openingDate: '2022.06.08',
  runningTime: '137',
  genre: '액션',
  description: '‘자윤’이 사라진 뒤, 정체불명의 집단의 무차별 습격으로 마녀 프로젝트가 진행되고 있는 ‘아크’가 초토화된다.\n' +
    '그곳에서 홀로 살아남은 ‘소녀’는 생애 처음 세상 밖으로 발을 내딛고\n' +
    '우연히 만난 ‘경희’의 도움으로 농장에서 지내며 따뜻한 일상에 적응해간다.\n' +
    '한편, ‘소녀’가 망실되자 행방을 쫓는 책임자 ‘장’과\n' +
    '마녀 프로젝트의 창시자 ‘백총괄’의 지령을 받고 제거에 나선 본사 요원 ‘조현’,\n' +
    '‘경희’의 농장 소유권을 노리는 조직의 보스 ‘용두’와\n' +
    '상해에서 온 의문의 4인방까지\n' +
    '각기 다른 목적을 지닌 세력이 하나 둘 모여들기 시작하면서 ‘소녀’ 안에 숨겨진 본성이 깨어나는데…\n' +
    '\n' +
    '모든 것의 시작,\n' +
    '더욱 거대하고 강력해진 마녀가 온다.',
  image: '/assets/movie/poster/마녀2.jpg',
  rated: '15',
  agent: {
    ID: 1,
    Name: 'John Heart',
    Phone: '(213) 555-9392',
    Picture: '/assets/movie/poster/마녀2.jpg',
  },
}, {
  id: 2,
  title: '범죄도시2',
  advanceTicketSale: '16.4',
  openingDate: '2022.06.01',
  runningTime: '106',
  genre: '범죄, 액션',
  description: '가리봉동 소탕작전 후 4년 뒤,\n' +
    '금천서 강력반은 베트남으로 도주한 용의자를 인도받아 오라는 미션을 받는다.\n' +
    '\n' +
    '괴물형사 ‘마석도’(마동석)와 ‘전일만’(최귀화) 반장은 현지 용의자에게서 수상함을 느끼고,\n' +
    '그의 뒤에 무자비한 악행을 벌이는 ‘강해상’(손석구)이 있음을 알게 된다.\n' +
    '\n' +
    '‘마석도’와 금천서 강력반은 한국과 베트남을 오가며\n' +
    '역대급 범죄를 저지르는 ‘강해상’을 본격적으로 쫓기 시작하는데...\n' +
    '\n' +
    '나쁜 놈들 잡는 데 국경 없다!\n' +
    '통쾌하고 화끈한 범죄 소탕 작전이 다시 펼쳐진다!',
  image: '/assets/movie/poster/범죄도시2.jpg',
  rated: '15',
  agent: {
    ID: 2,
    Name: 'Olivia Peyton',
    Phone: '(310) 555-2728',
    Picture: 'images/employees/09.png',
  },
}, {
  id: 3,
  title: '탑건:매버릭',
  advanceTicketSale: '14.9',
  openingDate: '2022.06.17',
  runningTime: '130',
  genre: '액션',
  description: '최고의 파일럿이자 전설적인 인물 매버릭(톰 크루즈)은 자신이 졸업한 훈련학교 교관으로 발탁된다.\n' +
    '그의 명성을 모르던 팀원들은 매버릭의 지시를 무시하지만\n' +
    '실전을 방불케 하는 상공 훈련에서 눈으로 봐도 믿기 힘든 전설적인 조종 실력에 모두가 압도된다.\n' +
    '\n' +
    '매버릭의 지휘 아래 견고한 팀워크를 쌓아가던 팀원들에게 국경을 뛰어넘는 위험한 임무가 주어지자\n' +
    '매버릭은 자신이 가르친 동료들과 함께 마지막이 될지 모를 하늘 위 비행에 나서는데…',
  image: '/assets/movie/poster/탑건-매버릭.jpg',
  rated: '12',
  agent: {
    ID: 3,
    Name: 'Robert Reagan',
    Phone: '(818) 555-2387',
    Picture: 'images/employees/03.png',
  },
}, {
  id: 4,
  title: '버즈 라이트이어',
  advanceTicketSale: '14.3',
  openingDate: '2022.05.25',
  runningTime: '150',
  genre: '애니메이션, 액션, 어드벤처',
  description: '미션 #1\n' +
    '나, 버즈 라이트이어.\n' +
    '인류 구원에 필요한 자원을 감지하고 현재 수많은 과학자들과 미지의 행성으로 향하고 있다.\n' +
    '이번 미션은 인류의 역사를 새롭게 쓸 것이라 확신한다.\n' +
    '\n' +
    '미션 #2\n' +
    '잘못된 신호였다.\n' +
    '이곳은 삭막하고 거대한 외계 생물만이 살고 있는 폐허의 땅이다.\n' +
    '나의 실수로 모두가 이곳에 고립되고 말았다.\n' +
    '모두를 구하기 위해서 모든 것을 제자리에 돌려 놔야 한다.\n' +
    '\n' +
    '미션 #3\n' +
    '실수를 바로잡기 위한 탈출 미션을 위해 1년의 준비를 마쳤다.\n' +
    '어쩌다 한 팀이 된 정예 부대와 이 미션을 수행할 예정이다.\n' +
    '우주를 집어삼킬 ‘저그’와 대규모 로봇 군사의 위협이 계속되지만\n' +
    '나는 절대 포기할 수 없다.\n' +
    '그런데… 여긴 또 어디지? 시간 속에 갇힌 건가?',
  image: '/assets/movie/poster/버즈 라이트이어.jpg',
  rated: 'all',
  agent: {
    ID: 4,
    Name: 'Greta Sims',
    Phone: '(818) 555-6546',
    Picture: 'images/employees/04.png',
  },
}, {
  id: 5,
  title: '브로커',
  advanceTicketSale: '10.3',
  openingDate: '2022.06.15',
  runningTime: '129',
  genre: '드라마',
  description: '세탁소를 운영하지만 늘 빚에 시달리는 ‘상현’(송강호)과\n' +
    '베이비 박스 시설에서 일하는 보육원 출신의 ‘동수’(강동원).\n' +
    '거센 비가 내리는 어느 날 밤,\n' +
    '그들은 베이비 박스에 놓인 한 아기를 몰래 데려간다.\n' +
    '하지만 이튿날, 생각지 못하게 엄마 ‘소영’(이지은)이 아기 ‘우성’을 찾으러 돌아온다.\n' +
    '아기가 사라진 것을 안 소영이 경찰에 신고하려 하자 솔직하게 털어놓는 두 사람.\n' +
    '우성이를 잘 키울 적임자를 찾아 주기 위해서 그랬다는 변명이 기가 막히지만\n' +
    '소영은 우성이의 새 부모를 찾는 여정에 상현, 동수와 함께하기로 한다.\n' +
    '\n' +
    '한편 이 모든 과정을 지켜본 형사 ‘수진’(배두나)과 후배 ‘이형사’(이주영).\n' +
    '이들을 현행범으로 잡고 반 년째 이어온 수사를 마무리하기 위해 조용히 뒤를 쫓는다.\n' +
    '\n' +
    '베이비 박스,\n' +
    '그곳에서 의도치 않게 만난 이들의\n' +
    '예기치 못한 특별한 여정이 시작된다.',
  image: '/assets/movie/poster/브로커.jpg',
  rated: '12',
  agent: {
    ID: 1,
    Name: 'John Heart',
    Phone: '(213) 555-9392',
    Picture: 'images/employees/01.png',
  },
}, {
  id: 6,
  title: '쥬라기 월드:도미니언',
  advanceTicketSale: '3.3',
  openingDate: '2022.05.18',
  runningTime: '147',
  genre: '액션, 어드벤처',
  description: '지상 최대 블록버스터의 압도적 피날레!\n' +
    '\n' +
    '공룡들의 터전이었던 이슬라 누블라 섬이 파괴된 후,\n' +
    '마침내 공룡들은 섬을 벗어나 세상 밖으로 출몰한다.\n' +
    '지상에 함께 존재해선 안 될 위협적 생명체인 공룡의 등장으로\n' +
    '인류 역사상 겪어보지 못한 사상 최악의 위기를 맞이한 인간들.\n' +
    '지구의 최상위 포식자 자리를 걸고 인간과 공룡의 최후의 사투가 펼쳐진다.',
  image: '/assets/movie/poster/쥬라기월드-도미니언.jpg',
  rated: '12',
  agent: {
    ID: 2,
    Name: 'Olivia Peyton',
    Phone: '(310) 555-2728',
    Picture: 'images/employees/09.png',
  },
}, {
  id: 7,
  title: '필하모닉 여름음악회',
  advanceTicketSale: '2.8',
  openingDate: '2022.06.22',
  runningTime: '111',
  genre: '공연',
  description: '빈 쉔부른 궁전에서 펼쳐지는 아름다운 한여름 밤의 콘서트!\n' +
    '\n' +
    '여름의 시작을 알리는 빈 필하모닉 여름음악회가 한여름 밤 별빛 아래에서 아름다운 클래식 선율을 선사한다. 공연이 열리는 쉔부른 궁전은 유네스코 세계문화유산에 등재된 곳으로, 바로크 양식의 궁전과 이를 둘러싼 정원이 빈 필하모닉의 음악을 더욱 빛낸다.\n' +
    '올해 주제는 ‘유럽의 공통 유산’으로, 다양한 색채와 유서 깊은 전통을 지닌 유럽 작곡가들의 음악으로 구성되어있다. 특별히 현대 라트비아 작곡가 아르투르스 마스카치와 우크라이나 작곡가 미콜라 리센코의 작품이 최초로 공연된다. 이번 여름음악회는 세계 무대에서 활동하는 지휘자 안드리스 넬슨스와 첼로계의 빛나는 별 고티에 카퓌송이 만나 다채로운 유럽 음악을 들려줄 예정이다.',
  image: '/assets/movie/poster/2022빈필여름.jpg',
  rated: 'all',
  agent: {
    ID: 3,
    Name: 'Robert Reagan',
    Phone: '(818) 555-2387',
    Picture: 'images/employees/03.png',
  },
}, {
  id: 8,
  title: '그대가 조국',
  advanceTicketSale: '2.3',
  openingDate: '2022.06.15',
  runningTime: '124',
  genre: '다큐멘터리',
  description: '검찰의 칼날이 그대에게 향하지 않는다고 자신할 수 있는가\n' +
    '사냥이 시작됐다. 검찰이 던진 좌표를 따라 언론은 몰려들고 소문은 꼬리를 문다. 분노한 대중 앞에 검찰은 칼을 휘두른다. 저기 쫓기는 자는 누구인가. 그대가 아니라고 자신할 수 있는가.',
  image: '/assets/movie/poster/그대가 조국.jpg',
  rated: '12',
  agent: {
    ID: 4,
    Name: 'Greta Sims',
    Phone: '(818) 555-6546',
    Picture: 'images/employees/04.png',
  },
}, {
  id: 9,
  title: '카시오페아',
  advanceTicketSale: '1',
  openingDate: '2022.06.01',
  runningTime: '102',
  genre: '드라마',
  description: '이혼 후 변호사, 엄마로 완벽한 삶을 살아가려고 노력하는 수진은 하나뿐인 딸 지나의 미국 유학을 준비하고 있다.\n' +
    '\n' +
    '정신없이 바쁜 수진을 위해 아빠 인우가 손녀를 돌보게 되면서 세 사람은 함께 살게 된다.\n' +
    '\n' +
    '얼마 후 수진은 교통사고를 당하고, 병원에서 알츠하이머라는 뜻밖의 결과를 듣게 된다.\n' +
    '\n' +
    '사랑하는 딸을 잊을까 봐 두려워하는 수진을 위해 아빠 인우는 수진의 곁을 지키고, 기억을 잊어도 살아갈 수 있도록 이들 부녀만의 애틋한 동행이 시작된다.',
  image: '/assets/movie/poster/카시오페아.jpg',
  rated: '12',
  agent: {
    ID: 1,
    Name: 'John Heart',
    Phone: '(213) 555-9392',
    Picture: 'images/employees/01.png',
  },
}, {
  id: 10,
  title: '실종',
  advanceTicketSale: '0.7',
  openingDate: '2022.06.15',
  runningTime: '123',
  genre: '스릴러',
  description: '수배 중인 연쇄살인마를 목격한 후 포상금을 탈 생각에 들떠있던 아빠 ‘사토시’\n' +
    '어느 날, 아무런 흔적도 없이 사라져버린다.\n' +
    '딸 ‘카에데’는 유일한 가족인 아빠를 찾아 나서고,\n' +
    '아빠의 일터에서 아빠의 이름을 쓰고 있는 한 남자를 발견한다.\n' +
    '그리고 그가 바로 아빠가 사라지기 전 목격한\n' +
    '연쇄살인마라는 사실을 알게 되고 그를 쫓기 시작하는데…',
  image: '/assets/movie/poster/실종.jpg',
  rated: '18',
  agent: {
    ID: 1,
    Name: 'John Heart',
    Phone: '(213) 555-9392',
    Picture: 'images/employees/01.png',
  },
},
];

const URL = '/dna/practice/movies';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  find(id: number): Observable<Employee> {
    return this.http.get<any>(`${URL}/${id}`);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<any>(`${URL}`, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<any>(`${URL}/${id}`, employee);
  }

  delete(id: number): Observable<Employee> {
    return this.http.delete<any>(`${URL}/${id}`);
  }

  getHouses() {
    return houses;
  }
}
