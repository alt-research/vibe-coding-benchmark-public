import pytest
import json
import subprocess
import os
from pathlib import Path

SCRIPT_PATH = Path(__file__).parent.parent / "transform.py"
TEST_DATA_PATH = Path(__file__).parent / "fixtures" / "sales.xlsx"
OUTPUT_PATH = Path(__file__).parent / "output.json"


@pytest.fixture(autouse=True)
def cleanup():
    yield
    if OUTPUT_PATH.exists():
        OUTPUT_PATH.unlink()


def test_script_runs_without_error():
    """Script should execute successfully"""
    result = subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script failed: {result.stderr}"


def test_output_is_valid_json():
    """Output should be valid JSON"""
    subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True
    )

    with open(OUTPUT_PATH) as f:
        data = json.load(f)

    assert "orders" in data
    assert "metadata" in data


def test_orders_have_required_fields():
    """Each order should have all required fields"""
    subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True
    )

    with open(OUTPUT_PATH) as f:
        data = json.load(f)

    required_fields = ["order_id", "customer_name", "order_date", "amount", "status"]

    for order in data["orders"]:
        for field in required_fields:
            assert field in order, f"Missing field: {field}"


def test_dates_are_iso_format():
    """All dates should be in YYYY-MM-DD format"""
    subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True
    )

    with open(OUTPUT_PATH) as f:
        data = json.load(f)

    import re
    date_pattern = re.compile(r"^\d{4}-\d{2}-\d{2}$")

    for order in data["orders"]:
        assert date_pattern.match(order["order_date"]), \
            f"Invalid date format: {order['order_date']}"


def test_amounts_are_numeric():
    """All amounts should be numeric (float)"""
    subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True
    )

    with open(OUTPUT_PATH) as f:
        data = json.load(f)

    for order in data["orders"]:
        assert isinstance(order["amount"], (int, float)), \
            f"Amount is not numeric: {order['amount']}"


def test_no_duplicate_order_ids():
    """There should be no duplicate order IDs"""
    subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True
    )

    with open(OUTPUT_PATH) as f:
        data = json.load(f)

    order_ids = [o["order_id"] for o in data["orders"]]
    assert len(order_ids) == len(set(order_ids)), "Duplicate order IDs found"


def test_metadata_is_accurate():
    """Metadata should match actual data"""
    subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True
    )

    with open(OUTPUT_PATH) as f:
        data = json.load(f)

    assert data["metadata"]["total_orders"] == len(data["orders"])

    total_amount = sum(o["amount"] for o in data["orders"])
    assert abs(data["metadata"]["total_amount"] - total_amount) < 0.01


def test_status_is_valid_enum():
    """Status should be one of: pending, completed, cancelled"""
    subprocess.run(
        ["python", str(SCRIPT_PATH), str(TEST_DATA_PATH), str(OUTPUT_PATH)],
        capture_output=True
    )

    with open(OUTPUT_PATH) as f:
        data = json.load(f)

    valid_statuses = {"pending", "completed", "cancelled"}

    for order in data["orders"]:
        assert order["status"] in valid_statuses, \
            f"Invalid status: {order['status']}"
