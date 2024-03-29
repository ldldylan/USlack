# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Workspace.destroy_all
  WorkspaceSubscription.destroy_all
  Channel.destroy_all
  ChannelSubscription.destroy_all
  Message.destroy_all
  
  
  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('workspaces')
  ApplicationRecord.connection.reset_pk_sequence!('workspace_subscriptions')
  ApplicationRecord.connection.reset_pk_sequence!('channels')
  ApplicationRecord.connection.reset_pk_sequence!('channel_subscriptions')
  ApplicationRecord.connection.reset_pk_sequence!('messages')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    demo_user_1 = User.create!(
      display_name: 'Demo User 1', 
      email: 'demo1@user.io', 
      password: 'password',
      title: "Full Stack Engineer" 
    )

    demo_user_2 = User.create!(
      display_name: 'Demo User 2', 
      email: 'demo2@user.io', 
      password: 'password',
      title: "front-end developer" 
    )

    dilang = User.create!(
      display_name: 'Dilang', 
      email: 'dilang@user.io', 
      password: 'password',
      title: "Full Stack Developer" 
    )

    puts "Creating workspaces..."

    workspace_1 = Workspace.create!(
      name: "App Academy",
      owner_id: demo_user_1.id
    )
    
    workspace_2 = Workspace.create!(
      name: "Full stack development",
      owner_id: demo_user_1.id
    )

    workspace_3 = Workspace.create!(
      name: "PC Gaming",
      owner_id: demo_user_1.id
    )

    workspace_4 = Workspace.create!(
      name: "VR Gaming",
      owner_id: demo_user_1.id
    )

    workspace_5 = Workspace.create!(
      name: "Nintendo",
      owner_id: demo_user_2.id
    )


    puts "Creating workspace subscriptions..."
    WorkspaceSubscription.create!(
      workspace_id: workspace_1.id,
      user_id: demo_user_1.id
    )
    
    WorkspaceSubscription.create!(
      workspace_id: workspace_2.id,
      user_id: demo_user_1.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_3.id,
      user_id: demo_user_1.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_4.id,
      user_id: demo_user_1.id
    )
    
    WorkspaceSubscription.create!(
      workspace_id: workspace_5.id,
      user_id: demo_user_1.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_1.id,
      user_id: demo_user_2.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_3.id,
      user_id: demo_user_2.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_5.id,
      user_id: demo_user_2.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_1.id,
      user_id: dilang.id
    )
    
    WorkspaceSubscription.create!(
      workspace_id: workspace_2.id,
      user_id: dilang.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_3.id,
      user_id: dilang.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_4.id,
      user_id: dilang.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_5.id,
      user_id: dilang.id
    )

    puts "Creating channels..."
  
    workspace_1_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_1.id
    )

    workspace_1_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_1.id
    )

    workspace_1_announcements = Channel.create!(
      name: "announcements",
      owner_id: demo_user_1.id,
      workspace_id: workspace_1.id
    )

    workspace_2_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_2.id
    )

    workspace_2_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_2.id
    )

    workspace_2_help_requests = Channel.create!(
      name: "help-requests",
      owner_id: demo_user_2.id,
      workspace_id: workspace_2.id
    )

    workspace_3_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_3.id
    )

    workspace_3_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_3.id
    )

    workspace_3_elden_ring = Channel.create!(name: 'elden ring', description: '', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_3.id
    )

    workspace_3_sekiro = Channel.create!(name: 'sekiro : shadows die twice', description: '', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_3.id
    )

    workspace_4_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_4.id
    )

    workspace_4_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_4.id
    )

    workspace_4_beat_saber = Channel.create!(name: 'beat saber', description: '',
    owner_id: demo_user_1.id, 
    workspace_id: workspace_4.id
    )

    workspace_5_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_2.id, 
    workspace_id: workspace_5.id
    )

    workspace_5_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_2.id, 
    workspace_id: workspace_5.id
    )

    workspace_5_zelda = Channel.create!(name: 'zelda', description: '',
    owner_id: dilang.id, 
    workspace_id: workspace_5.id
    )

    workspace_5_smash = Channel.create!(name: 'super smash bros. ultimate', description: '',
    owner_id: dilang.id, 
    workspace_id: workspace_5.id
    )

    puts "Creating channel subscriptions..."
    ChannelSubscription.create!(
      channel_id: workspace_1_general.id,
      user_id: demo_user_1.id
    )
    
    ChannelSubscription.create!(
      channel_id: workspace_1_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_1_announcements.id,
      user_id: demo_user_1.id
    )
      
    ChannelSubscription.create!(
      channel_id: workspace_2_general.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_2_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_2_help_requests.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_3_general.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_3_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_3_elden_ring.id,
      user_id: demo_user_1.id
    )
    ChannelSubscription.create!(
      channel_id: workspace_3_sekiro.id,
      user_id: demo_user_1.id
    )
    ChannelSubscription.create!(
      channel_id: workspace_3_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_4_general.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_4_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_4_beat_saber.id,
      user_id: demo_user_1.id
    )
    
    
    ChannelSubscription.create!(
      channel_id: workspace_5_general.id,
      user_id: demo_user_1.id
    )
    
    ChannelSubscription.create!(
      channel_id: workspace_5_random.id,
      user_id: demo_user_1.id
      )

    ChannelSubscription.create!(
      channel_id: workspace_5_zelda.id,
      user_id: demo_user_1.id
    )
    ChannelSubscription.create!(
      channel_id: workspace_5_smash.id,
      user_id: demo_user_1.id
    )

    workspace_1.channels.each do |channel| 
      ChannelSubscription.create!(
      channel_id: channel.id,
      user_id: demo_user_2.id)
    end
    

    workspace_3.channels.each do |channel| 
      ChannelSubscription.create!(
      channel_id: channel.id,
      user_id: demo_user_2.id)
    end

    workspace_5.channels.each do |channel| 
      ChannelSubscription.create!(
      channel_id: channel.id,
      user_id: demo_user_2.id)
    end


    ChannelSubscription.create!(
      channel_id: workspace_1_general.id,
      user_id: dilang.id
    )
    ChannelSubscription.create!(
      channel_id: workspace_1_random.id,
      user_id: dilang.id
    )

    workspace_2.channels.each do |channel| 
      ChannelSubscription.create!(
      channel_id: channel.id,
      user_id: dilang.id)
    end

    ChannelSubscription.create!(
      channel_id: workspace_3_elden_ring.id,
      user_id: dilang.id
    )
    ChannelSubscription.create!(
      channel_id: workspace_4_beat_saber.id,
      user_id: dilang.id
    )
    ChannelSubscription.create!(
      channel_id: workspace_5_zelda.id,
      user_id: dilang.id
    )
    ChannelSubscription.create!(
      channel_id: workspace_5_smash.id,
      user_id: dilang.id
      )
    
      # More users
    more_users = []
    14.times do 
      new_user = User.create!({
        display_name: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
      more_users << new_user
    end

    all_workspaces = [workspace_1, workspace_2, workspace_3, workspace_4, workspace_5]
    more_users.each do |user|
      all_workspaces.each do |workspace|
          WorkspaceSubscription.create!(
          workspace_id: workspace.id,
          user_id: user.id
        )
        workspace.channels.each do |channel| 
          ChannelSubscription.create!(
            channel_id: channel.id,
            user_id: user.id
          )
        end
      end
    end
      

    puts "Creating messages..."
    Message.create!(
      text: 'Hey yo!',
      author_id: 1,
      messageable_type: 'Channel',
      messageable_id: 1
    )

    Message.create!(
      text: "What's up",
      author_id: 2,
      messageable_type: 'Channel',
      messageable_id: 1
    )
    Message.create!(
      text: "Gooooooood",
      author_id: 4,
      messageable_type: 'Channel',
      messageable_id: 1
    )

    Message.create!(
      text: "✌",
      author_id: 3,
      messageable_type: 'Channel',
      messageable_id: 1
    )

    Message.create!(
      text: 'Hello!',
      author_id: 2,
      messageable_type: 'Channel',
      messageable_id: 2
    )

    Message.create!(
      text: "Hiiiii",
      author_id: 1,
      messageable_type: 'Channel',
      messageable_id: 2
    )

    Message.create!(
      text: 'MERN project starts tmr!',
      author_id: 2,
      messageable_type: 'Channel',
      messageable_id: 3
    )
    
    Message.create!(
      text: "let's play super smash bro tonight🤘",
      author_id: 15,
      messageable_type: 'Channel',
      messageable_id: 17
    )

    Message.create!(
      text: "let's gooooo💪",
      author_id: 16,
      messageable_type: 'Channel',
      messageable_id: 17
    )

    Message.create!(
      text: "👌",
      author_id: 10,
      messageable_type: 'Channel',
      messageable_id: 17
    )
    puts "Done!"
  end