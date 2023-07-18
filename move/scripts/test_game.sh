# aptos init --profile bob
# aptos init --profile alice

# create_task
aptos move run --function-id local::bountytask::create_task --args string:'alice' --args u64:200 --profile alice

aptos move run --function-id local::bountytask::join_game --args string:bob --profile bob

# check game data
aptos move view --function-id local::tasklist_addr::get_rocklist --profile alice

# get hash
# salt=1234, opt=1 0x6fb2b41d1dcaa3aaf7ff4d5957674dd07299458ecd66945e87b3e9b4e021fad5
# salt=2234, opt=2 0xd6f95423a34a0351733b882872a474f6fa0694736151b3ca7419dd15bda21b33
aptos move view --function-id local::tasklist_addr::hash_opt --args string:"1234" --args u8:1 --profile alice
aptos move view --function-id local::tasklist_addr::hash_opt --args string:"2234" --args u8:2 --profile bob

# sumit hash

aptos move run --function-id local::tasklist_addr::submit --args string:0x6fb2b41d1dcaa3aaf7ff4d5957674dd07299458ecd66945e87b3e9b4e021fad5 --profile alice

aptos move run --function-id local::tasklist_addr::submit --args string:0xd6f95423a34a0351733b882872a474f6fa0694736151b3ca7419dd15bda21b33 --profile bob

# submit proof 

aptos move run --function-id local::tasklist_addr::proof --args string:"1234" --args u8:1  --profile alice

aptos move run --function-id local::tasklist_addr::proof --args string:"2234" --args u8:2 --profile bob

# get winner
aptos move view --function-id local::tasklist_addr::get_winner --profile alice