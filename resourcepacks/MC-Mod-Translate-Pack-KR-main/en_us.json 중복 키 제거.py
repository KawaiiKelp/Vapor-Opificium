import json
import re
from collections import Counter

def remove_all_duplicate_keys(json_file):
    with open(json_file, "r", encoding="utf-8") as f:
        raw_text = f.read()

    # 모든 키 찾기 (JSON에서 "key": 형식 추출)
    keys = re.findall(r'"(.*?)"\s*:', raw_text)

    # 키 등장 횟수 세기
    key_counts = Counter(keys)

    # 중복된 키 목록 가져오기 (2번 이상 등장한 키)
    duplicate_keys = {k for k, v in key_counts.items() if v > 1}

    # JSON을 줄 단위로 나누고 중복 키가 포함된 줄 삭제
    cleaned_lines = []
    for line in raw_text.splitlines():
        match = re.search(r'"(.*?)"\s*:', line)
        if match and match.group(1) in duplicate_keys:
            continue  # 중복된 키가 있는 줄은 삭제
        cleaned_lines.append(line)

    # JSON 포맷 문제 해결 (마지막 쉼표 정리)
    cleaned_json = "\n".join(cleaned_lines)
    cleaned_json = re.sub(r",\s*}", "}", cleaned_json)  # 마지막 요소 뒤에 있는 쉼표 제거
    cleaned_json = re.sub(r",\s*\]", "]", cleaned_json)  # 배열 내 마지막 쉼표 제거

    # JSON 다시 저장
    with open(json_file, "w", encoding="utf-8") as f:
        f.write(cleaned_json)

# 사용 예시
remove_all_duplicate_keys("en_us.json")
