# aptos init --profile local
# aptos move compile --package-dir ./ --named-addresses tasklist_addr=local

aptos move publish --package-dir ./ --named-addresses tasklist_addr=local --profile local

# aptos move run --function-id local::guessing_game::reset  --profile local
